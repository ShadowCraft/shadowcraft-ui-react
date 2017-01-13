from .models import character
from .models import item

def get_character_data(mongo, region, realm, name, sha=None):
    print("get data: %s %s %s %s" % (region, realm, name, sha))
    return character.load(mongo.db, region, realm, name, sha=sha)

def refresh_character(mongo, region, realm, name):
    print("refresh: %s %s %s" % (region, realm, name))
    return character.load(mongo.db, region, realm, name, refresh=True)

def get_debug_sha(mongo, character_json):
    print("get debug sha: %s" % character_json)
    return character.get_sha(mongo.db, character_json)

def get_items_by_slot(mongo, slot, min_ilvl=-1, max_ilvl=-1):
    return Item.get_items_by_slot(mongo, slot, min_ilvl, max_ilvl)

if __name__ == '__main__':
    print("test")
