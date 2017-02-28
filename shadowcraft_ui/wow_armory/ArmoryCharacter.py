# -*- coding: utf-8 -*-

import csv
import os
from . import ArmoryDocument
from . import ArmoryConstants

class ArmoryCharacter(object):

    artifact_ids = None

    def __init__(self, character, realm, region='us'):
        region = region.lower()
        params = {'fields': 'talents,items'}
        json_data = ArmoryDocument.get(region, '/wow/character/%s/%s' % (realm, character), params)

        # Make sure these get stored in the same fashion as they come in.
        self.region = region
        self.realm = realm
        self.name = character

        for index, tree in enumerate(json_data['talents']):
            if 'selected' in tree and tree['selected']:
                self.active = tree['calcSpec']

        self.populate(region, json_data)

    def populate(self, region, json_data):
        self.level = int(json_data['level'])
        self.player_class = ArmoryConstants.CLASS_MAP[int(json_data['class'])]
        self.race = ArmoryConstants.RACE_MAP[int(json_data['race'])]
        self.portrait = 'http://%s.battle.net/static-render/%s/%s' % (region, region, json_data['thumbnail'])

        # For talents, make sure to ignore any blank specs. Druids will actually have 4 specs
        # filled in, but rogues will return three good specs and one with a blank calcSpec
        # field.
        self.talents = [x for x in json_data['talents'] if len(x['calcSpec']) > 0]

        self.gear = {}
        if 'items' not in json_data or len(json_data['items']) == 0:
            raise ArmoryDocument.ArmoryError('No items found on character')

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
                'bonuses': slot_item['bonusLists'],
                'context': slot_item['context'],
                'quality': slot_item['quality'],
            }

            info['enchant'] = tooltip['enchant'] if 'enchant' in tooltip else 0

            # there can be multiple gems in tooltipParams from the armory
            # so we need to check for them all i.e. gem0, gem1, gem2
            for tooltip_item in tooltip:
                if tooltip_item.startswith('gem'):
                    # armory will error if we request an id of zero and an empty gem slot is 0
                    if tooltip[tooltip_item] != 0:
                        gemdata = ArmoryDocument.get('us', '/wow/item/%d' % tooltip[tooltip_item])
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

            # We squash all of the world quest contexts down into one.
            # TODO: why are we doing this again? something about the data being the
            # same between all of those contexts?
            if info['context'].startswith('world-quest'):
                info['context'] = 'world-quest'

            self.gear[key] = info

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
        self.artifact = {}
        self.artifact['spec'] = self.active
        self.artifact['traits'] = {}
        for trait in json_data['items']['mainHand']['artifactTraits']:
            # Special case around an error in the artifact power DBC data from the CDN where
            # trait ID 859 maps to multiple spell IDs.
            trait_id = ArmoryCharacter.artifact_id(trait['id'])
            if trait['id'] == 859:
                trait_id = 197241
            self.artifact['traits'][str(trait_id)] = trait['rank']

        self.artifact['relics'] = [None]*3
        for relic in json_data['items']['mainHand']['relics']:
            entry = {
                'id': relic['itemId'],
            }

            # Make another request to blizzard to get the item level for this relic,
            # since the character data doesn't include enough information.
            try:
                params = {'bl': ','.join(map(str, relic['bonusLists']))}
                relic_json = ArmoryDocument.get(region, '/wow/item/%d' % relic['itemId'], params)
                entry['ilvl'] = relic_json['itemLevel']
                self.artifact['relics'][relic['socket']] = entry
            except ArmoryDocument.MissingDocument:
                print("Failed to retrieve extra relic data")

        # Make sure there's something in each of the relic data slots so that the UI doesn't
        # freak out about it.
        for relic in self.artifact['relics']:
            if relic is None:
                relic = {'id': 0, 'ilvl': 0}

    def as_json(self):
        talents = {}
        for tree in self.talents:
            talents[tree['calcSpec']] = tree['calcTalent']

        return {
            "region": self.region,
            "realm": self.realm,
            "name": self.name,
            "gear": self.gear,
            "artifact": self.artifact,
            "race": self.race,
            "level": self.level,
            "active": self.active,
            "player_class": self.player_class,
            "talents": talents
        }

    def __iter__(self):
        data = self.as_json()
        for slot, item in data.items():
            yield(slot, item)

    # Maps the a trait ID from the artifact data to a spell ID using the DBC data
    # from the Blizzard CDN
    @staticmethod
    def artifact_id(trait_id):
        # The header on the ArtifactPowerRank data looks like (as of 7.0.3):
        # id,id_spell,value,id_power,f5,index
        # We're mapping between id_power and id_spell
        if ArmoryCharacter.artifact_ids is None:
            ArmoryCharacter.artifact_ids = {}
            with open(os.getcwd()+'/shadowcraft_ui/external_data/ArtifactPowerRank.dbc.csv', mode='r') as infile:
                reader = csv.reader(infile)
                next(reader) # Skip the first row with the header
                for row in reader:
                    ArmoryCharacter.artifact_ids[int(row[3])] = int(row[1])

        return ArmoryCharacter.artifact_ids[trait_id] if trait_id in ArmoryCharacter.artifact_ids else 0

def test_character():

    character = ArmoryCharacter('tamen', 'aerie-peak', 'us')
    print(character.artifact)
    print(character.as_json())
    print(dict(character))

if __name__ == '__main__':

    test_character()
