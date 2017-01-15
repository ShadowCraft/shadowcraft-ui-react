import re
import requests
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
from wow_armory import ArmoryDocument

def get_items_by_slot(db, slot, min_ilvl=-1, max_ilvl=-1):
    query = {'properties.equip_location': slot}
    if min_ilvl != -1:
        query['item'] = {'$gte':min_ilvl}
    if max_ilvl != -1:
        query['item'] = {'$lte':max_ilvl}
        results = db.items.find(query)
        return dumps([x for x in results])

def init_db(db):
    db.items.create_index([('remote_id', pymongo.ASCENDING),
                           ('contexts', pymongo.ASCENDING)], unique=True)
    db.items.create_index([('remote_id', pymongo.ASCENDING),
                           ('item_level', pymongo.ASCENDING),
                           ('is_gem', pymongo.ASCENDING)], unique=True)

def populate_db():
    mongo = MongoClient()
    db = mongo.roguesim_development
    return ''

def get_ids_from_wowhead_by_ilvl(prefix, quality, min_ilvl, max_ilvl):
    url = 'http://%s.wowhead.com/items/min-level:%d/max-level:%d/class:4/quality:%d/live-only:on?filter=21;1;0' % (prefix, min_ilvl, max_ilvl, quality)
    return get_ids_from_wowhead(url)

def get_ids_from_wowhead_by_type(item_type):
    url = 'http://www.wowhead.com/gems/type:%d?filter=166;7;0' % item_type
    return get_ids_from_wowhead(url)

def get_ids_from_wowhead(url):
    ids = []
    resp = requests.get(url, timeout=7, headers={'user-agent':ArmoryDocument.USER_AGENT})
    if resp.status_code == 200:
        match_iter = re.finditer(r'_\[(\d+)\]=\{.*?\}', resp.text)
        for match in match_iter:
            ids.append(int(match.groups(1)[0]))

    return ids

def test_item():
    print(get_ids_from_wowhead_by_type(-9))

if __name__ == '__main__':
    test_item()
