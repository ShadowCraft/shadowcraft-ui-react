"""a collection of functions that fetch data from our db"""
from .models import character
from .models import item


def get_character_data(mongo, region, realm, name, sha=None):
    """this will get a character from the db, fetching from bnet if needed"""
    print("get data: %s %s %s %s" % (region, realm, name, sha))
    return character.load(mongo.db, region, realm, name, sha=sha)


def get_debug_sha(mongo, character_json):
    """generates and returns a sha for a set of character/settings data. used for debugging peoples' problems"""
    print("get debug sha: %s" % character_json)
    return character.get_sha(mongo.db, character_json)


def get_items_by_slot(mongo, slot: int, min_ilvl: int = -1, max_ilvl: int = -1):
    """fetchs item data from the db for the item drop down lists in the ui"""
    return item.get_items_by_slot(mongo.db, slot, min_ilvl, max_ilvl)


def get_item_by_context(mongo, item_id: int, context: str):
    """fetchs item data from the db for an item based on id and context"""
    return item.get_item_by_context(mongo.db, item_id, context)

if __name__ == '__main__':
    print("test")
