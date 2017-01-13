# -*- coding: utf-8 -*-

import csv

class ArmoryCharacter(object):

    artifact_ids = None

    def __init__(self, character, realm, region='us'):
        region = region.lower()
        params = {'fields': 'talents,items'}
        json_data = ArmoryDocument.get(region, '/wow/character/%s/%s' % (realm, character), params)
        self.populate(region, json_data)

        # Make sure these get stored in the same fashion as they come in.
        self.region = region
        self.realm = realm
        self.name = character

        for index, tree in enumerate(json_data['talents']):
            if 'selected' in tree and tree['selected']:
                self.active = index

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

        for k, v in json_data['items'].items():
            if not isinstance(v, dict):
                continue
            if k not in ArmoryConstants.SLOT_MAP:
                continue

            tooltip = v['tooltipParams'] if 'tooltipParams' in v else {}
            info = {
                'id': v['id'],
                'item_level': v['itemLevel'],
                'gems': [],
                'slot': ArmoryConstants.SLOT_MAP[k],
                'bonuses': v['bonusLists'],
                'context': v['context'],
                'quality': v['quality'],
            }

            info['enchant'] = tooltip['enchant'] if 'enchant' in tooltip else 0
            info['gems'].append(tooltip['gem0'] if 'gem0' in tooltip else 0)
            info['gems'].append(tooltip['gem1'] if 'gem1' in tooltip else 0)
            info['gems'].append(tooltip['gem2'] if 'gem2' in tooltip else 0)

            # We squash all of the world quest contexts down into one.
            # TODO: why are we doing this again? something about the data being the
            # same between all of those contexts?
            if info['context'].startswith('world-quest'):
                info['context'] = 'world-quest'

            self.gear[str(info['slot'])] = info

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
        self.artifact['traits'] = []
        for trait in json_data['items']['mainHand']['artifactTraits']:
            # Special case around an error in the artifact power DBC data from the CDN where
            # trait ID 859 maps to multiple spell IDs.
            if trait['id'] == 859:
                trait['id'] = 197241
            else:
                trait['id'] = ArmoryCharacter.artifact_id(trait['id'])
            self.artifact['traits'].append(trait)

        self.artifact['relics'] = []
        for relic in json_data['items']['mainHand']['relics']:
            r = {
                'socket': relic['socket'],
                'id': relic['itemId'],
                'bonuses': relic['bonusLists'],
            }

            # Make another request to blizzard to get the item level for this relic,
            # since the character data doesn't include enough information.
            try:
                params = {'bl': ','.join(map(str, relic['bonusLists']))}
                relic_json = ArmoryDocument.get(region, '/wow/item/%d' % relic['itemId'], params)
                r['ilvl'] = relic_json['itemLevel']
                self.artifact['relics'].append(r)
            except ArmoryDocument.MissingDocument:
                print("Failed to retrieve extra relic data")

    def as_json(self):
        talents = []
        for tree in self.talents:
            talents.append({"spec": tree['calcSpec'], 'talents': tree['calcTalent']})

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
        for k, v in data.items():
            yield(k, v)

    # Maps the a trait ID from the artifact data to a spell ID using the DBC data
    # from the Blizzard CDN
    @staticmethod
    def artifact_id(trait_id):
        # The header on the ArtifactPowerRank data looks like (as of 7.0.3):
        # id,id_spell,value,id_power,f5,index
        # We're mapping between id_power and id_spell
        if ArmoryCharacter.artifact_ids is None:
            ArmoryCharacter.artifact_ids = {}
            with open('../external_data/ArtifactPowerRank.dbc.csv', mode='r') as infile:
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
