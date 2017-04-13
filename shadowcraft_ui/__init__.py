"""a collection of functions that fetch data from our db"""
from .models import character
from .models import item

def get_character_data(mongo, region, realm, name, sha=None):
    """this will get a character from the db, fetching from bnet if needed"""
    print("get data: %s %s %s %s" % (region, realm, name, sha))
    return character.load(mongo.db, region, realm, name, sha=sha)

def refresh_character(mongo, region, realm, name):
    """this will force an update from bnet and update the db"""
    print("refresh: %s %s %s" % (region, realm, name))
    return character.load(mongo.db, region, realm, name, refresh=True)

def get_debug_sha(mongo, character_json):
    """tamen knows what this does"""
    print("get debug sha: %s" % character_json)
    return character.get_sha(mongo.db, character_json)

def get_items_by_slot(mongo, slot, min_ilvl=-1, max_ilvl=-1):
    """fetchs item data from the db for the item drop down lists in the ui"""
    return item.get_items_by_slot(mongo, slot, min_ilvl, max_ilvl)

if __name__ == '__main__':
    print("test")
