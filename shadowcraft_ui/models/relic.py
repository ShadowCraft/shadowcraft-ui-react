import pymongo
from wow_armory import ArmoryRelic
import item

def init_db(db):
    db.relics.create_index([('remote_id', pymongo.ASCENDING),
                            ('type', pymongo.ASCENDING)], unique=True)

def populate_db(db):
    # In this order: Iron, Blood, Shadow, Fel, Storm
    wowhead_ids = []
    wowhead_ids.extend(item.get_ids_from_wowhead_by_type(-8))
    wowhead_ids.extend(item.get_ids_from_wowhead_by_type(-9))
    wowhead_ids.extend(item.get_ids_from_wowhead_by_type(-10))
    wowhead_ids.extend(item.get_ids_from_wowhead_by_type(-11))
    wowhead_ids.extend(item.get_ids_from_wowhead_by_type(-17))
    item_ids = set(wowhead_ids)
    print(item_ids)

    pos = 0
    for item_id in item_ids:
        if pos % 10 == 0:
            print("Relic %d of %d" % (pos, len(item_ids)))
        pos += 1
        import_relic(db, item_id)

def import_relic(db, item_id):
    relic = ArmoryRelic.get(item_id)
    entry = {'remote_id': item_id,
             'type': relic['type'],
             'traits': relic['traits']}
    db.relics.replace_one({'remote_id': item_id, 'type': relic['type']},
                          entry, upsert=True)

def test_relic():
    mongo_db = pymongo.MongoClient()
    populate_db(mongo_db.roguesim_python)

if __name__ == '__main__':
    test_relic()
