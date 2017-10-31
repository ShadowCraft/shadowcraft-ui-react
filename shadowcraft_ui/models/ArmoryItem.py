import csv
import re
import copy
import os
import ArmoryConstants
import ArmoryDocument

class ArmoryItem(object):

    # Some static data that used by the item loader code
    item_upgrades = None
    upgrade_rulesets = None

    def __init__(self, json_data):
        self.name = json_data['name']
        self.ilevel = int(json_data['itemLevel'])
        self.item_id = int(json_data['id'])
        self.upgradable = ArmoryItem.check_upgradable(self.item_id)
        self.populate_data(json_data)

    def populate_data(self, json_data):
        self.quality = json_data['quality']
        self.icon = json_data.get('icon','')
        self.equip_location = self.convertInventoryType(json_data['inventoryType'])
        if self.icon == '':
            print('##### Item %d/%s has a blank icon' % (self.item_id, json_data['context']))

        # Tag is the header text on an item that has a description, such as
        # 'warforged' or 'heroic'. This field is used in the display of items.
        # If the value doesn't come along in the json data, make one up based
        # on the context field.
        if 'nameDescription' in json_data:
            self.tag = json_data['nameDescription']
        elif json_data['context'].endswith('-mythic'):
            self.tag = 'Mythic'
        elif json_data['context'].endswith('-heroic'):
            self.tag = 'Heroic'
        elif json_data['context'].endswith('-normal'):
            self.tag = ''
        elif json_data['context'] == 'raid-finder':
            self.tag = 'Raid Finder'
        else:
            self.tag = ''

        # If this item is a gem or an armor item, save some additional information about it.
        if json_data['itemClass'] == 3:
            if 'gemInfo' in json_data:
                self.gem_slot = json_data['gemInfo']['type']['type'].title()
                self.stats = ArmoryItem.scan_str(json_data['gemInfo']['bonus']['name'])
            else:
                self.stats = {}

        elif json_data['itemClass'] == 4:
            if json_data['itemSubClass'] in ArmoryConstants.ARMOR_CLASS:
                self.armor_class = ArmoryConstants.ARMOR_CLASS[json_data['itemSubClass']]

        if json_data['itemClass'] != 3 and 'bonusStats' in json_data:
            self.stats = {}
            for entry in json_data['bonusStats']:
                if entry['stat'] not in ArmoryConstants.STAT_LOOKUP:
                    print("STAT ID missing: %s", entry['stat'])
                else:
                    self.stats[ArmoryConstants.STAT_LOOKUP[entry['stat']]] = entry['amount']

        # If an item has chanceBonusLists, then it's an item that can have
        # various bonuses attached to it like item sockets, random enchantments,
        # etc. Store these with the item if they exist so they can be displayed
        # on the popup for the item.
        self.bonus_tree = json_data['bonusLists'] if 'bonusLists' in json_data else []
        self.chance_bonus_lists = json_data['bonusSummary']['chanceBonusLists']

        # If this item is a weapon, we need to store a little bit of information
        # about it.
        if 'weaponInfo' in json_data:
            self.speed = float(json_data['weaponInfo']['weaponSpeed'])
            self.dps = float(json_data['weaponInfo']['dps'])
            self.subclass = json_data['itemSubClass']
            self.min_dmg = float(json_data['weaponInfo']['damage']['exactMin'])
            self.max_dmg = float(json_data['weaponInfo']['damage']['exactMax'])

        if 'socketInfo' in json_data:
            self.socket_count = len(json_data['socketInfo']['sockets'])
        else:
            self.socket_count = 0

    IGNORE_FIELDS = ['item_id', 'ilevel', 'context', 'bonus_tree', 'tag']
    IGNORE_FOR_GEMS = ['speed', 'dps', 'subclass', 'armor_class', 'upgradable',
                       'chance_bonus_lists', 'equip_location', 'socket_count',
                       'min_dmg', 'max_dmg']

    def as_json(self):
        ret = copy.deepcopy(self.__dict__)
        for i in ArmoryItem.IGNORE_FIELDS:
            if i in ret:
                ret.pop(i, None)

        if 'gem_slot' in ret:
            for i in ArmoryItem.IGNORE_FOR_GEMS:
                if i in ret:
                    ret.pop(i, None)
        else:
            ret.pop('quality', None)

        return ret

    def __iter__(self):
        data = self.as_json()
        for slot, item in data.items():
            yield(slot, item)

    # This method takes a string like "+4 Critical Strike" and turns it into a
    # hash of two values. The values are the attribute being modified and the
    # value of the modifier.
    @staticmethod
    def scan_str(string):
        ret = {}
        for attr in ArmoryConstants.SCAN_ATTRIBUTES:
            match = re.search(r"\+(\d+) (%s)" % attr, string, re.IGNORECASE)
            if match:
                attr = match.group(2).lower()
                if attr in ArmoryConstants.SCAN_OVERRIDE:
                    attr = ArmoryConstants.SCAN_OVERRIDE[attr]
                re.sub(r' ', '_', attr)
                ret[attr] = int(match.group(1))
            else:
                match = re.search(r"Equip:.*(%s) by (\d+)" % attr, string,
                                  re.IGNORECASE)
                if match:
                    attr = match.group(1).lower()
                    if attr in ArmoryConstants.SCAN_OVERRIDE:
                        attr = ArmoryConstants.SCAN_OVERRIDE[attr]
                    re.sub(r' ', '_', attr)
                    ret[attr] = int(match.group(2))
        return ret

    # The mapping for upgrades goes as follows:
    # 1. The RulesetItemUpgrade file contains a list of items that can be
    #    upgraded and maps to a ID of the kind of upgrade.
    # 2. The ItemUpgrade file contains a list of kinds of upgrades and maps
    #    from those IDs to the number of upgrades for that kind (via a
    #    chain of previous IDs) and the currency necessary for the upgrade.
    #
    # For ShC, we only care about valor upgrades so we can skip any other
    # kind of upgrade.
    @staticmethod
    def check_upgradable(item_id):
        rule = ArmoryItem.upgrade_ruleset(item_id)
        if rule != None:
            item_upgrade = ArmoryItem.item_upgrade(rule)
            # valor in 6.2.3 is currency type 1191
            if item_upgrade == 1191:
                return True
        return False

    # item_upgrades and upgrade_rulesets are used to determine if a piece of gear is
    # eligible for a valor upgrade. They are used in the check_upgradable method.
    @staticmethod
    def item_upgrade(rule_id):
        # The header on the ItemUpgrade data looks like (as of 7.0.3):
        # id,cost,prev_id,id_currency_type,upgrade_group,upgrade_ilevel
        # We only care about the prev_id and id_currency_type ones
        if ArmoryItem.item_upgrades is None:
            ArmoryItem.item_upgrades = {}
            filepath = os.path.dirname(os.path.abspath(__file__))
            with open(os.path.join(filepath, '..', 'external_data', 'ItemUpgrade.dbc.csv'), mode='r') as infile:
                reader = csv.DictReader(infile)
                for row in reader:
                    p_id = int(row['prev_id'])
                    currency = int(row['id_currency_type'])
                    if p_id != 0 and currency != 0:
                        ArmoryItem.item_upgrades[p_id] = currency
        return ArmoryItem.item_upgrades[rule_id] if rule_id in ArmoryItem.item_upgrades else None

    @staticmethod
    def upgrade_ruleset(item_id):
        # The header on the RulesetItemUpgrade data looks like (as of 7.0.3):
        # id,id_item,id_upgrade_base
        # We only care about the last two of these.
        if ArmoryItem.upgrade_rulesets is None:
            ArmoryItem.upgrade_rulesets = {}
            filepath = os.path.dirname(os.path.abspath(__file__))
            with open(os.path.join(filepath, '..', 'external_data', 'RulesetItemUpgrade.dbc.csv'), mode='r') as infile:
                reader = csv.reader(infile)
                next(reader) # Skip the first row with the header
                for row in reader:
                    ArmoryItem.upgrade_rulesets[int(row[1])] = int(row[2])

        if item_id in ArmoryItem.upgrade_rulesets:
            return item_id
        else:
            return None

    def convertInventoryType(self, inventory_type):
        mapping = {
            1: 'head',
            2: 'neck',
            3: 'shoulder',
            4: 'shirt',
            5: 'chest',
            6: 'waist',
            7: 'legs',
            8: 'feet',
            9: 'wrist',
            10: 'hands',
            11: 'finger',
            12: 'trinket',
            16: 'back',
            17: 'mainHand',
            21: 'mainHand',
            22: 'offHand'
        }

        if inventory_type in mapping:
            return mapping[inventory_type]
        else:
            return ''

def test_item():
    print(ArmoryItem.check_upgradable(142512))
    print(ArmoryItem.check_upgradable(124367))
    print(ArmoryItem.scan_str("+4 Critical Strike"))
    print(ArmoryItem.scan_str("Equip: Mastery by 4"))
    json_data = ArmoryDocument.get('us', '/wow/item/%d' % 124367)
    item = ArmoryItem(json_data)
    print(item.name)
    print(item.as_json())

if __name__ == '__main__':
    test_item()
