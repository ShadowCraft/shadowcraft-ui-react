#from shadowcraft_ui.wow_armory.item import ArmoryItem
from pymongo import MongoClient
from bson.json_util import dumps
import requests

def get_items_by_slot(db, slot, min_ilvl=-1, max_ilvl=-1):
    query = {'properties.equip_location': slot}
    if min_ilvl != -1:
        query['item'] = {'$gte':min_ilvl}
    if max_ilvl != -1:
        query['item'] = {'$lte':max_ilvl}
        results = db.items.find(query)
        return dumps([x for x in results])

def populate_db():
    mongo = MongoClient()
    db = mongo.roguesim_development
    return ""

def test_item():
    print('test')

if __name__ == '__main__':
    test_item()
