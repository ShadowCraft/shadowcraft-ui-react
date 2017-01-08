from .models.character import Character
from .models.item import Item

class ShcUrlHandler(object):
    def get_character_data(region, realm, name, sha=''):
        print("get data: %s %s %s %s" % (region, realm, name, sha))
        c = Character(region, realm, name, sha)
        return c.as_json()

    def refresh_character(region, realm, name):
        print("refresh: %s %s %s" % (region, realm, name))
        c = Character(region, realm, name)
        c.refresh()

    def get_debug_sha(character_json):
        print("get debug sha: %s" % character_json)
        ret = {'sha':'test'}
        return ret

    def get_items_by_slot(slot, min_ilvl=-1, max_ilvl=-1):
        return Item.get_items_by_slot(slot, min_ilvl, max_ilvl)

if __name__ == '__main__':
    print("test")
