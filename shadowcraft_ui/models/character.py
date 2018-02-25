# -*- coding: utf-8 -*-
"""model for characters in mongo"""

import hashlib
import json
import os
import csv
import traceback
import jsonschema

from . import ArmoryDocument
from . import ArmoryConstants
from .ArmoryItem import ArmoryItem

# re-version data when this file changes. we use file size to keep track of this, which is a
# terrible metric usually, but is fast and is good enough to just tell if something has
# changed.
CHARACTER_DATA_VERSION = hashlib.md5(open(__file__, 'rb').read()).hexdigest()

def load(db, region, realm, name, sha=None):

    sha_error = None
    char_data = None
    if sha:
        # If we're loading from a sha, check to see if that sha is in the db.
        # If it's there, load that data. If it's not, force a refresh.
        results = db.history.find({'sha': sha})
        if results.count() != 0:
            char_data = results[0]['json']
        else:
            sha_error = "Failed to find SHA value in the database, loaded fresh copy from the Armory"
            print(sha_error)

        if char_data is not None and ('data_version' not in char_data or char_data['data_version'] != CHARACTER_DATA_VERSION):
            char_data = None
            sha_error = "Character data version didn't match, loaded fresh copy from the Armory"
            print(sha_error)

    if char_data is None:
        # If we haven't gotten data yet, we need to try to reload it from the
        # armory.
        try:
            char_data = __get_from_armory(db, name, realm, region)
            char_data['data_version'] = CHARACTER_DATA_VERSION
            if sha_error is not None:
                char_data['sha_error'] = sha_error
        except ArmoryDocument.ArmoryError as error:
            char_data = {'http_status': error.status_code, 'reason': str(error)}
            print("Failed to load character data for %s/%s/%s: %s" %
                  (region, realm.encode('utf-8','ignore'), name.encode('utf-8','ignore'), error))
        except Exception as error:
            char_data = {'http_status': 500, 'reason': str(error)}
            print("Failed to load character data for %s/%s/%s: %s" %
                  (region, realm.encode('utf-8','ignore'), name.encode('utf-8','ignore'), error))

    return char_data


def get_sha(db, char_data):

    # load the schema and validate this data against it
    filepath = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(filepath, '..', 'external_data', 'character_data_json.schema'), mode='r') as infile:
        schema = json.load(infile)

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
        # TODO: actually set the expiration
        db.history.replace_one(
            {'sha': sha}, {'sha': sha, 'json': char_data}, upsert=True)
        return {'sha': sha}

    return {}


def __get_from_armory(db, character, realm, region):

    region = region.lower()
    params = {'fields': 'talents, items, stats'}
    try:
        json_data = ArmoryDocument.get(
            region, '/wow/character/%s/%s' % (realm, character), params)
    except:
        raise

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

        # Talents are indexed from 1 in the engine and zero means "not selected". Fix it so
        # that's the case when we load the data here. There's probably a better way to do this.
        output['talents'][tree['calcSpec']] = output['talents'][tree['calcSpec']].replace("2", "3")
        output['talents'][tree['calcSpec']] = output['talents'][tree['calcSpec']].replace("1", "2")
        output['talents'][tree['calcSpec']] = output['talents'][tree['calcSpec']].replace("0", "1")
        output['talents'][tree['calcSpec']] = output['talents'][tree['calcSpec']].replace(".", "0")

    output['talents']['current'] = output['talents'][output['active']]

    if 'items' not in json_data or len(json_data['items']) == 0:
        raise ArmoryDocument.ArmoryError('No items found on character')

    totalIlvl = 0
    totalItems = 0
    for key, slot_item in json_data['items'].items():
        if not isinstance(slot_item, dict):
            continue
        if key == 'shirt' or key == 'tabard':
            continue

        tooltip = slot_item['tooltipParams'] if 'tooltipParams' in slot_item else {}
        info = {
            'id': slot_item['id'],
            'slot': key,
            'name': slot_item['name'],
            'icon': slot_item['icon'],
            'item_level': slot_item['itemLevel'],
            'gems': [],
            'stats': {},
            'bonuses': slot_item['bonusLists'],
            'quality': slot_item['quality'],
            'socket_count': 0
        }

        info['enchant'] = tooltip['enchant'] if 'enchant' in tooltip else 0

        # Look up this item in the database and check whether it has any fixed sockets
        # associated with it. Also create the gems array based on those sockets.
        if 1808 in info['bonuses']:
            info['socket_count'] = 1
        else:
            query = {'remote_id': info['id']}
            results = db.items.find(query)
            if results.count() != 0:
                info['socket_count'] = results[0]['socket_count']

        if info['socket_count'] > 0:
            info['gems'] = [0] * info['socket_count']

        # there can be multiple gems in tooltipParams from the armory
        # so we need to check for them all i.e. gem0, gem1, gem2
        for gem_index in range(0, info['socket_count']):
            gem_entry = 'gem%d' % gem_index
            if gem_entry in tooltip:
                tooltip_item = tooltip[gem_entry]
                gemdata = ArmoryDocument.get(
                    'us', '/wow/item/%d' % tooltip_item)
                info['gems'][gem_index] = {
                    'name': gemdata['name'],
                    'id': gemdata['id'],
                    'icon': gemdata['icon'],
                    'quality': gemdata['quality'],
                    'bonus': gemdata['gemInfo']['bonus']['name']
                }
            else:
                info['gems'][gem_index] = {
                    "name": "Empty Gem Socket",
                    "id": 0,
                    "icon": "",
                    "quality": 0,
                    "bonus": ""
                }

        # Give up on the stats sent by the API and use ones calculated directly from the
        # client data. This allows us to be internally consistent with the values we use
        # everywhere else in the code.
        info['stats'] = ArmoryItem.get_item_stats(info['id'], info['item_level'], key, info['quality'])

        # If this is a weapon, add the weapon stats to the stat block as well
        if 'weaponInfo' in slot_item:

            item_data = ArmoryItem.sparse_item(info['id'])
            weapon_stats = ArmoryItem.item_damage(info['item_level'], info['quality'],
                                                  float(item_data.get('dmg_range')),
                                                  float(item_data.get('delay')) / 1000)

            info['weaponStats'] = weapon_stats

        # each azerite entry is an icon, a spell, and a position. the active key is the current
        # tier that has been picked already. this saves the javascript from having to determine
        # which background to choose.
        if key in ['head', 'shoulder', 'chest']:
            info['azerite'] = {
                'active': 1,
                'tier1': [
                    {
                        'icon': 'ability_rogue_shadowstrikes',
                        'spell': 0,
                        'pos': 45
                    },
                    {
                        'icon': 'ability_rogue_shadowstrikes',
                        'spell': 0,
                        'pos': 135
                    },
                    {
                        'icon': 'ability_rogue_shadowstrikes',
                        'spell': 0,
                        'pos': 225
                    },
                    {
                        'icon': 'ability_rogue_shadowstrikes',
                        'spell': 0,
                        'pos': 315
                    },
                ],
                'tier2': [
                    {
                        'icon': 'ability_rogue_shadowstrikes',
                        'spell': 0,
                        'pos': 45
                    },
                    {
                        'icon': 'ability_rogue_shadowstrikes',
                        'spell': 0,
                        'pos': 180
                    },
                    {
                        'icon': 'ability_rogue_shadowstrikes',
                        'spell': 0,
                        'pos': 315
                    },
                ],
                'tier3': [
                    {
                        'icon': 'ability_rogue_shadowstrikes',
                        'spell': 0,
                        'pos': 90
                    },
                    {
                        'icon': 'ability_rogue_shadowstrikes',
                        'spell': 0,
                        'pos': 270
                    },
                ]}
        else:
            info['azerite'] = {}

        output['gear'][key] = info

        totalIlvl += info['item_level']
        totalItems += 1

    output['avg_item_level'] = round(totalIlvl / totalItems, 2)

    return output


def init_db(db):
    db.history.create_index("sha", unique=True, expireAfterSeconds=1209600)


def test_character():
    from pymongo import MongoClient
    db = MongoClient()['roguesim_python']

    init_db(db)

#    load(db, 'us', 'aerie-peak', 'tamen', sha='12345')
#    data2 = load(db, 'us', 'aerie-peak', 'tamen')
    data3 = load(db, 'us', 'aerie-peak', 'tamen')
    print(data3)

#    sha = get_sha(db, data3)
#    data4 = load(db, 'us', 'aerie-peak', 'tamen', sha=sha['sha'])
#    print(data2 == data4)

if __name__ == '__main__':
    test_character()
