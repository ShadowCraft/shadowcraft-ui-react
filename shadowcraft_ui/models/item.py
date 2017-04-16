"""model for items in mongo"""

import copy
import re
import requests
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
from ..wow_armory import ArmoryDocument
from ..wow_armory.ArmoryItem import ArmoryItem

# These are the only bonus IDs we care about displaying on the gear popouts.  They're
# mostly just the different difficulty levels that can be on gear.  Anything not listed
# here is ignored and a separate item is not created in the database for it.  This is
# how we prevent duplicates of items from showing up on the UI.  There are so many bonus
# IDs that it's easier to whitelist the ones we want, instead of blacklisting the ones
# we don't.
#
# This whitelist skips any of the randomly generated bonus IDs such as any "of the"
# bonuses and any "100%" IDs.  It also skips any bonus IDs that are sockets.
BASE_WHITELIST = [1, 15, 17, 18, 44, 171, 448, 449, 450, 451, 499, 526, 527, 545, 546, 547,
                  553, 554, 555, 556, 557, 558, 559, 566, 567, 573, 575, 576, 577, 582, 583,
                  591, 592, 593, 594, 602, 609, 615, 617, 618, 619, 620, 645, 656, 692]

# These are the bonus IDs for "base item levels". This generally means there are WF/TF
# versions of the item.
BASE_ILEVEL_WHITELIST = [1726, 1727, 1798, 1799, 1801, 1805, 1806, 1807, 1824, 1825, 1826,
                         3379, 3394, 3395, 3396, 3397, 3399, 3410, 3411, 3412, 3413, 3414,
                         3415, 3416, 3417, 3418, 3427, 3428, 3432, 3443, 3444, 3445, 3446]

BONUS_ID_WHITELIST = BASE_WHITELIST + BASE_ILEVEL_WHITELIST

# For some reason the crafted items don't come with the "stage" bonus IDs in their
# chanceBonusList entry.  This is the list of bonus IDs for those stages and is
# handled slightly differently.  See below for the check for trade-skill for more
# details.
WOD_TRADESKILL_BONUS_IDS = [525, 526, 527,
                            558, 559, 593, 594, 617, 619, 618, 620]
TRADESKILL_BONUS_IDS = [596, 597, 598, 599, 666, 667, 668, 669, 670, 671, 672]

ARTIFACT_WEAPONS = [128476, 128479, 128870, 128869, 128872, 134552]
ORDER_HALL_SET = [139739, 139740, 139741,
                  139742, 139743, 139744, 139745, 139746]
MIN_ILVL = 800

# This is the set of bonus IDs that should be on basically every legion item, but the API
# neglects to actually add. These are the four tertiary stats and a legion
# socket.
CHANCE_BONUSES = [40, 41, 42, 43, 1808, -1]


def get_items_by_slot(dbase: MongoClient, slot: int, min_ilvl: int=-1, max_ilvl: int=-1):
    """provides item lists for the drop downs in the ui"""
    query = {'properties.equip_location': slot}
    print(type(slot))
    # TODO: fix min/max query
    # if min_ilvl != -1:
    #     query['item'] = {'$gte': min_ilvl}
    # if max_ilvl != -1:
    #     query['item'] = {'$lte': max_ilvl}
    results = dbase.items.find(query)
    return dumps([x for x in results])


def init_db(dbase):
    """create indexes"""
    dbase.items.create_index(
        [
            ('remote_id', pymongo.ASCENDING),
            ('contexts', pymongo.ASCENDING)
        ],
        unique=True
    )
    dbase.items.create_index(
        [
            ('remote_id', pymongo.ASCENDING),
            ('item_level', pymongo.ASCENDING),
            ('is_gem', pymongo.ASCENDING)
        ],
        unique=True
    )


def populate_db(dbase):
    """get item data to put into mongo"""

    # Abuse wowhead to load in a big list of items to import
    wowhead_ids = []
    print("Requesting rare items from wowhead")
    print("Item levels 801 to 850...")
    wowhead_ids.extend(get_ids_from_wowhead_by_ilvl(3, 801, 850))
    print("Item levels 851 to 900...")
    wowhead_ids.extend(get_ids_from_wowhead_by_ilvl(3, 851, 900))
    print("Item levels 901 to 950...")
    wowhead_ids.extend(get_ids_from_wowhead_by_ilvl(3, 901, 950))

    print("Requesting epic items from wowhead")
    print("Item levels 801 to 850...")
    wowhead_ids.extend(get_ids_from_wowhead_by_ilvl(4, 801, 850))
    print("Item levels 851 to 900...")
    wowhead_ids.extend(get_ids_from_wowhead_by_ilvl(4, 851, 900))
    print("Item levels 901 to 950...")
    wowhead_ids.extend(get_ids_from_wowhead_by_ilvl(4, 901, 950))

    for item_type in ['rings', 'amulets', 'trinkets']:
        print("Requesting %s from wowhead" % item_type)
        wowhead_ids.extend(get_ids_from_wowhead(
            'http://www.wowhead.com/items/armor/%s/min-level:800/class:3' % item_type))
        wowhead_ids.extend(get_ids_from_wowhead(
            'http://www.wowhead.com/items/armor/%s/min-level:800/class:4' % item_type))

    print("Requesting legendaries from wowhead")
    wowhead_ids.extend(get_ids_from_wowhead(
        'http://www.wowhead.com/items/armor/min-level:895/class:4/quality:5'))

    wowhead_ids.extend(ARTIFACT_WEAPONS)
    wowhead_ids.extend(ORDER_HALL_SET)

    item_ids = set(wowhead_ids)
    print("Have %d items to load" % len(item_ids))
    print(wowhead_ids)

    pos = 0
    for item_id in item_ids:
        pos += 1
        if pos % 10 == 0:
            print("Loading item %d of %d" % (pos, len(item_ids)))
        import_item(dbase, item_id)


def import_item(dbase, item_id):
    """fetch data from bnet"""
    print("Importing %d" % item_id)

    # TODO: see if this item exists in the database before loading it. Do we want to
    # continue doing this?

    # Request the initial json data from the armory and insert it into an array of
    # json to be further processed.
    json_data = []
    try:
        base_json = ArmoryDocument.get('us', '/wow/item/%d' % item_id)
        json_data.append(base_json)
    except ArmoryDocument.MissingDocument as err:
        print("import_item failed to fetch %d: %s" % (item_id, err))
        return

    # Check if the item has any available contexts. Remove the first context since that
    # context is the one the first document's data is valid for. For example, loading
    # a document for an item with contexts ['raid-normal','raid-heroic'] will default
    # to returning data for raid-normal.
    contexts = copy.copy(base_json['availableContexts'])
    contexts = contexts[1:]

    # NOTE: removed bit about world-quest contexts here because it looks like the data
    # is actually fixed finally.

    # Next, look at the chance bonus lists that accompany the item. This bonus list is
    # the things that can be applied to an item, such as extra titles (warforged, crafting
    # stages), tertiary stats, sockets, etc.
    item_chance_bonuses = get_bonus_ids_to_load(
        base_json['bonusSummary']['chanceBonusLists'], base_json['context'], base_json['itemLevel'])

    # Loop through the now-modified list of bonus IDs and load an additional item for
    # each of those IDs from teh armory, and store it in the list to be
    # processed.
    for bonus_id in item_chance_bonuses:
        try:
            print('Loading extra item for bonus ID %d' % bonus_id)
            bonuses = copy.copy(base_json['bonusLists'])
            bonuses.append(bonus_id)
            params = {"bl": ','.join(map(str, bonuses))}
            json = ArmoryDocument.get('us', '/wow/item/%d' % item_id, params)
            json_data.append(json)
        except ArmoryDocument.MissingDocument as err:
            print("import_item failed to fetch %d with extra bonuses: %s" %
                  (item_id, err))
            return

    world_quests = [x for x in contexts if x.startswith('world-quest-')]
    world_quests.sort()
    world_quests = world_quests[:-1]
    pvp_unranked = [x for x in contexts if x.startswith('pvp-unranked')]
    pvp_unranked.sort()
    pvp_unranked = pvp_unranked[:-1]

    contexts = [
        x for x in contexts if x not in world_quests and x not in pvp_unranked]

    # For each of the extra contexts, load the document for each one of them and store
    # it in the list of json to deal with.
    for context in contexts:
        try:
            print('Loading document for extra context %s' % context)
            json = ArmoryDocument.get(
                'us', '/wow/item/%d/%s' % (item_id, context))
            json_data.append(json)
        except ArmoryDocument.MissingDocument as err:
            print("import_item failed to fetch %d with extra bonuses: %s" %
                  (item_id, err))
            return

        # Same thing with the bonus IDs. Gotta load all of those too.
        item_chance_bonuses = get_bonus_ids_to_load(
            json['bonusSummary']['chanceBonusLists'], json['context'], json['itemLevel'])

        # Loop through the now-modified list of bonus IDs and load an additional item for
        # each of those IDs from teh armory, and store it in the list to be
        # processed.
        for bonus_id in item_chance_bonuses:
            try:
                print('Loading extra item for bonus ID %d' % bonus_id)
                bonuses = copy.copy(json['bonusLists'])
                bonuses.append(bonus_id)
                params = {"bl": ','.join(map(str, bonuses))}
                json = ArmoryDocument.get(
                    'us', '/wow/item/%d' % item_id, params)
                json_data.append(json)
            except ArmoryDocument.MissingDocument as err:
                print("import_item failed to fetch %d with extra bonuses: %s" %
                      (item_id, err))
                return

    current_total = len(json_data)
    json_data = [x for x in json_data if not(
        x['itemLevel'] < MIN_ILVL and
        item_id not in ARTIFACT_WEAPONS and
        item_id not in ORDER_HALL_SET
    )]
    print('Rejected %d json entries due to to item level filter' %
          (current_total - len(json_data)))
    print('Loading data from a total of %d json entries for this item' %
          len(json_data))

    # Loop through the json data tha twas retrieved and process each in turn
    for json in json_data:

        item = ArmoryItem(json)

        # check to see if there is an item in the database with this ID and base item
        # level yet. We combine duplicate items together based on those two
        # values.
        results = dbase.items.find(
            {'remote_id': item.item_id, 'item_level': item.ilevel})
        if results.count() != 0:
            db_item = results[0]
        else:
            db_item = None

        item = ArmoryItem(json)

        if db_item is None:
            db_item = {'remote_id': item.item_id,
                       'item_level': item.ilevel,
                       'properties': item.as_json()}
            db_item['is_gem'] = 'gem_slot' in db_item['properties']
            db_item['contexts'] = []
            db_item['context_map'] = {}

        name = json['context']
        context = {'tag': item.tag, 'defaultBonuses': item.bonus_tree}
        if json['context'].startswith('world-quest'):
            context['tag'] = 'World Quest'
            name = 'world-quest'
        elif json['context'].startswith('dungeon-level-up'):
            context['tag'] = 'dungeon-level-up'
            name = 'Level-up Dungeon'

        if name not in db_item['contexts']:
            db_item['context_map'][name] = context
            db_item['contexts'].append(name)

        dbase.items.replace_one({'remote_id': item.item_id, 'item_level': item.ilevel},
                                db_item, upsert=True)


def get_bonus_ids_to_load(possible_ids, context, item_level):
    """Trims a list of bonus IDs down to the set of IDs that we actually care about, like
    titles, since we load an additional item for each one of those. The bonus IDs that
    we want are white-listed earlier in this class. Extra items will be loaded for
    these bonus IDs."""

    item_chance_bonuses = copy.copy(possible_ids)
    item_chance_bonuses = [
        x for x in item_chance_bonuses if x in BONUS_ID_WHITELIST]

    # For trade-skil items, also add the bonuses for each of the "stage" titles
    if context == 'trade-skill':
        if item_level > 750:
            item_chance_bonuses.extend(TRADESKILL_BONUS_IDS)
        else:
            item_chance_bonuses.extend(WOD_TRADESKILL_BONUS_IDS)

    return item_chance_bonuses


def get_ids_from_wowhead_by_ilvl(quality, min_ilvl, max_ilvl):
    """Loads a list of item IDs from wowhead filtered by item level and quality"""
    url = 'http://www.wowhead.com/items/min-level:%d/max-level:%d/class:4/quality:%d/live-only:on?filter=21;1;0' % (
        min_ilvl, max_ilvl, quality)
    return get_ids_from_wowhead(url)


def get_ids_from_wowhead_by_type(item_type):
    """Loads a list of gem item IDs from wowhead filtered by gem type"""
    url = 'http://www.wowhead.com/gems/type:%d?filter=166;7;0' % item_type
    return get_ids_from_wowhead(url)


def get_ids_from_wowhead(url):
    """Loads a list of item IDs from wowhead based on a wowhead URL"""
    ids = []
    resp = requests.get(
        url,
        timeout=7,
        headers={'user-agent': ArmoryDocument.USER_AGENT}
    )
    if resp.status_code == 200:
        match_iter = re.finditer(r'_\[(\d+)\]=\{.*?\}', resp.text)
        for match in match_iter:
            ids.append(int(match.groups(1)[0]))

    print("Found %d new items from wowhead" % len(ids))
    return ids


def test_item():
    """load mongo with test items"""
    mongo = MongoClient()
    populate_db(mongo.roguesim_python)
#    import_item(mongo.roguesim_python, 121015)
#    import_item(mongo.roguesim_python, 135815)

if __name__ == '__main__':
    test_item()
