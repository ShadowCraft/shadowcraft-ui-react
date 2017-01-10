#from shadowcraft_ui.wow_armory.item import ArmoryItem
from pymongo import MongoClient
from bson.json_util import dumps
import requests

class Item(object):
    def __init(self, mongo):
        pass

    def get_items_by_slot(mongo, slot, min_ilvl=-1, max_ilvl=-1):
        query = {'properties.equip_location': slot}
        if (min_ilvl != -1):
            query['item'] = {'$gte':min_ilvl}
        if (max_ilvl != -1):
            query['item'] = {'$lte':max_ilvl}
        results = mongo.db.items.find(query)
        return dumps([x for x in results])

    def populate_db():
        mongo = MongoClient()
        db = mongo.roguesim_development
        return ""

if __name__ == '__main__':
    print('test')
