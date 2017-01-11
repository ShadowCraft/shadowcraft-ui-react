from .models.character import Character
from .models.item import Item

class ShcUrlHandler(object):
    def get_character_data(mongo, region, realm, name, sha=''):
        print("get data: %s %s %s %s" % (region, realm, name, sha))
        return Character.get(mongo.db, region, realm, name, sha=sha)

    def refresh_character(mongo, region, realm, name):
        print("refresh: %s %s %s" % (region, realm, name))
        return Character.get(mongo.db, region, realm, name, refresh=true)

    def get_debug_sha(mongo, character_json):
        print("get debug sha: %s" % character_json)
        return Character.get_sha(mongo.db, character_json)

    def get_items_by_slot(mongo, slot, min_ilvl=-1, max_ilvl=-1):
        return Item.get_items_by_slot(mongo, slot, min_ilvl, max_ilvl)

if __name__ == '__main__':
    print("test")
