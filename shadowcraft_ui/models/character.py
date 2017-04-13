"""model for characters in mongo"""

import hashlib
import json
import os
import traceback
import jsonschema
import pymongo

from ..wow_armory import ArmoryDocument
from ..wow_armory import ArmoryConstants
from ..wow_armory.ArmoryCharacter import ArmoryCharacter

# re-version data when ArmoryCharacter.py changes (file size)
CHARACTER_DATA_VERSION = os.path.getsize('shadowcraft_ui/models/character.py')


def load(db, region, realm, name, sha=None, refresh=False):

    # refresh=True

    char_data = None
    if sha:
        # If we're loading from a sha, check to see if that sha is in the db.
        # If it's there, load that data. If it's not, force a refresh.
        results = db.history.find({'sha': sha})
        if results.count() != 0:
            char_data = results[0]['json']
        else:
            print(
                "Failed to find SHA value in the database, \
                will attempt to load character from Armory"
            )
            refresh = True

    if not refresh:
        # Check to see if the character is in the database. If it's there, load
        # it and return.
        query = {'region': region, 'realm': realm, 'name': name}
        results = db.characters.find(query)
        if results.count() != 0:
            char_data = results[0]

    # Check if the character data version from the database is still current. If it's not,
    # ignore the data from the database and load something new from the armory. This lets
    # us make changes to the character data layout and not break the UI every
    # time.
    if char_data is not None:
        if 'data_version' not in char_data or char_data['data_version'] != CHARACTER_DATA_VERSION:
            char_data = None

    if char_data is None:
        # If we haven't gotten data yet, we need to try to reload it from the
        # armory.
        try:
            char_data = __get_from_armory(db, name, realm, region)
            char_data['data_version'] = CHARACTER_DATA_VERSION
        except Exception as error:
            char_data = None
            print("Failed to load character data for %s/%s/%s: %s" %
                  (region, realm, name, error))
            traceback.print_exc()

        if char_data != None:
            # Store it in the database
            db.characters.replace_one({'region': region, 'realm': realm, 'name': name},
                                      char_data, upsert=True)

    return char_data


def get_sha(db, char_data):
    # TODO: load the schema from disk

    # load the schema and validate this data against it
    schema = {
        "type": "object",
        "properties": {
            "value": {"type": "number"},
        },
    }

    try:
        jsonschema.validate(char_data, schema)
    except jsonschema.ValidationError as error:
        print("Character data failed validation: %s" % error)
    except jsonschema.SchemaError as error:
        print("JSON schema error: %s" % error)
    else:
        # Generate a sha1 hash of the data
        sha = hashlib.sha1(json.dumps(char_data).encode('utf-8')).hexdigest()

        # store the hash in the database, making sure to set the expiration on it
        # so that mongo automatically removes it after a set amount of time.
        db.history.replace_one(
            {'sha': sha}, {'sha': sha, 'json': char_data}, upsert=True)
        return {'sha': sha}

    return {}

__artifact_ids = None

# Maps the a trait ID from the artifact data to a spell ID using the DBC data
# from the Blizzard CDN


def __artifact_id(trait_id):
    # The header on the ArtifactPowerRank data looks like (as of 7.0.3):
    # id,id_spell,value,id_power,f5,index
    # We're mapping between id_power and id_spell
    if __artifact_ids is None:
        __artifact_ids = {}
        with open(
            os.getcwd() + '/shadowcraft_ui/external_data/ArtifactPowerRank.dbc.csv',
            mode='r'
        ) as infile:
            reader = csv.reader(infile)
            next(reader)  # Skip the first row with the header
            for row in reader:
                __artifact_ids[int(row[3])] = int(row[1])

    return __artifact_ids[trait_id] if trait_id in __artifact_ids else 0


def __get_from_armory(db, character, realm, region):

    region = region.lower()
    params = {'fields': 'talents, items, stats'}
    json_data = ArmoryDocument.get(
        region, '/wow/character/%s/%s' % (realm, character), params)

    output = {
        "region": region,
        "realm": realm,
        "name": character,
        "level": int(json_data['level']),
        "player_class": ArmoryConstants.CLASS_MAP[int(json_data['class'])],
        "race": ArmoryConstants.RACE_MAP[int(json_data['race'])],
        "portrait": 'http://render-%s.worldofwarcraft.com/character/%s' % (
            region, json_data['thumbnail']
        ),
        "stats": json_data['stats'],
        "talents": {},
        "gear": {},
        "artifact": {},

        # stub data from engine
        "weights": {
            "agi": 2.5,
            "haste": 1.5,
            "mastery": 1.1,
            "versatility": 1.1,
            "crit": 1.2,
            "mainHand": 3.1,
            "offHand": 2.1
        }
    }

    for index, tree in enumerate(json_data['talents']):
        if 'selected' in tree and tree['selected']:
            output['active'] = tree['calcSpec']

    # For talents, make sure to ignore any blank specs. Druids will actually have 4 specs
    # filled in, but rogues will return three good specs and one with a blank calcSpec
    # field.
    talents = [x for x in json_data['talents'] if len(x['calcSpec']) > 0]
    for tree in talents:
        output['talents'][tree['calcSpec']] = tree['calcTalent']
    output['talents']['current'] = output['talents'][output['active']]

    if 'items' not in json_data or len(json_data['items']) == 0:
        raise ArmoryDocument.ArmoryError('No items found on character')

    for key, slot_item in json_data['items'].items():
        if not isinstance(slot_item, dict):
            continue
        if key == 'shirt' or key == 'tabard':
            continue

        tooltip = slot_item[
            'tooltipParams'] if 'tooltipParams' in slot_item else {}
        info = {
            'id': slot_item['id'],
            'slot': key,
            'name': slot_item['name'],
            'icon': slot_item['icon'],
            'item_level': slot_item['itemLevel'],
            'gems': [],
            'stats': {},
            'bonuses': slot_item['bonusLists'],
            'context': slot_item['context'],
            'quality': slot_item['quality'],
        }

        info['enchant'] = tooltip['enchant'] if 'enchant' in tooltip else 0

        # there can be multiple gems in tooltipParams from the armory
        # so we need to check for them all i.e. gem0, gem1, gem2
        for tooltip_item in tooltip:
            if tooltip_item.startswith('gem'):
                # armory will error if we request an id of zero and an empty
                # gem slot is 0
                if tooltip[tooltip_item] != 0:
                    gemdata = ArmoryDocument.get(
                        'us', '/wow/item/%d' % tooltip[tooltip_item])
                    info['gems'].append(
                        {
                            'name': gemdata['name'],
                            'id': gemdata['id'],
                            'icon': gemdata['icon'],
                            'quality': gemdata['quality'],
                            'bonus': gemdata['gemInfo']['bonus']['name'],
                            'gemslot': tooltip_item
                        })
                else:
                    info['gems'].append(tooltip[tooltip_item])

        # Convert the stats from the numeric index to a text one
        for stat_entry in slot_item['stats']:
            stat = ArmoryConstants.STAT_LOOKUP[stat_entry['stat']]
            if stat not in info['stats']:
                info['stats'][stat] = 0
            info['stats'][stat] += stat_entry['amount']

        # If this is a weapon, add the weapon stats to the stat block as well
        if 'weaponInfo' in slot_item:
            info['weaponStats'] = {}
            info['weaponStats']['min_dmg'] = slot_item[
                'weaponInfo']['damage']['exactMin']
            info['weaponStats']['max_dmg'] = slot_item[
                'weaponInfo']['damage']['exactMax']
            info['weaponStats']['speed'] = slot_item[
                'weaponInfo']['weaponSpeed']
            info['weaponStats']['dps'] = slot_item['weaponInfo']['dps']

        # We squash all of the world quest contexts down into one.
        # TODO: why are we doing this again? something about the data being the
        # same between all of those contexts?
        if info['context'].startswith('world-quest'):
            info['context'] = 'world-quest'

        output['gear'][key] = info

    # Artifact data from the API looks like this:
    #            "artifactTraits": [{
    #                "id": 1348,
    #                "rank": 1
    #            }, {
    #                "id": 1061,
    #                "rank": 4
    #            }, {
    #                "id": 1064,
    #                "rank": 3
    #            }, {
    #                "id": 1066,
    #                "rank": 3
    #            }, {
    #                "id": 1060,
    #                "rank": 3
    #            }, {
    #                "id": 1054,
    #                "rank": 1
    #            }],
    #            "relics": [{
    #                "socket": 0,
    #                "itemId": 133008,
    #                "context": 11,
    #                "bonusLists": [768, 1595, 1809]
    #            }, {
    #                "socket": 1,
    #                "itemId": 133057,
    #                "context": 11,
    #                "bonusLists": [1793, 1595, 1809]
    #            }],

    output['artifact']['spec'] = output['active']
    output['artifact']['traits'] = {}
    for trait in json_data['items']['mainHand']['artifactTraits']:
        # Special case around an error in the artifact power DBC data from the CDN where
        # trait ID 859 maps to multiple spell IDs.
        trait_id = ArmoryCharacter.artifact_id(trait['id'])
        if trait['id'] == 859:
            trait_id = 197241
        output['artifact']['traits'][str(trait_id)] = trait['rank']

    # Make sure that the primary trait for every spec is present in the character data. It
    # doesn't come over in the data from Blizzard. Just set it to one, because honestly who
    # is going to load a weapon with no traits in it? If they do, they can just deal with it
    # not showing up right.
    if output['active'] == 'a':
        output['artifact']['traits']['192759'] = 1
    elif output['active'] == 'Z':
        output['artifact']['traits']['202665'] = 1
    elif output['active'] == 'b':
        output['artifact']['traits']['209782'] = 1

    output['artifact']['relics'] = [None] * 3
    for relic in json_data['items']['mainHand']['relics']:

        # We want to return the trait ID that this relic modifies here instead of the ID of
        # the relic itself. This means we need to look up this relic in the database and
        # find the trait for the currently active spec.
        query = {'remote_id': relic['itemId']}
        results = db.relics.find(query)
        if results.count() != 0:

            entry = {'id': results[0]['traits'][output['active']]['spell']}

            # Make another request to blizzard to get the item level for this relic,
            # since the character data doesn't include enough information.
            try:
                params = {'bl': ','.join(map(str, relic['bonusLists']))}
                relic_json = ArmoryDocument.get(
                    region, '/wow/item/%d' % relic['itemId'], params)
                entry['ilvl'] = relic_json['itemLevel']
                output['artifact']['relics'][relic['socket']] = entry
            except ArmoryDocument.MissingDocument:
                print("Failed to retrieve extra relic data")

    # Make sure there's something in each of the relic data slots so that the UI doesn't
    # freak out about it.
    for relic in output['artifact']['relics']:
        if relic is None:
            relic = {'id': 0, 'ilvl': 0}

    return output


def init_db(db):
    db.characters.create_index([("region", pymongo.ASCENDING),
                                ("realm", pymongo.ASCENDING),
                                ("name", pymongo.ASCENDING)], unique=True)
    db.history.create_index("sha", unique=True, expireAfterSeconds=1209600)


def test_character():
    from pymongo import MongoClient
    db = MongoClient()['roguesim_python']

    init_db(db)

#    load(db, 'us', 'aerie-peak', 'tamen', sha='12345')
#    data2 = load(db, 'us', 'aerie-peak', 'tamen')
    data3 = load(db, 'us', 'aerie-peak', 'tamen', refresh=True)
    print(data3)

#    sha = get_sha(db, data3)
#    data4 = load(db, 'us', 'aerie-peak', 'tamen', sha=sha['sha'])
#    print(data2 == data4)

if __name__ == '__main__':
    test_character()
