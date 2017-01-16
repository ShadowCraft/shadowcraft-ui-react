import pymongo
from wow_armory import ArmorySpell
import item

def init_db(db):
    db.artifacts.create_index([('remote_id', pymongo.ASCENDING)], unique=True)

def populate_db(db):
    url = 'http://www.wowhead.com/spells/artifact-traits/class:4'
    wowhead_ids = item.get_ids_from_wowhead(url)
    spell_ids = set(wowhead_ids)

    pos = 0
    for spell_id in spell_ids:
        pos = pos + 1
        if pos % 10 == 0:
            print("Artifact spell %d of %d" % (pos, len(spell_ids)))
        spell = ArmorySpell.get('us', spell_id)
        entry = {'remote_id': spell_id,
                 'name': spell['name'],
                 'icon': spell['icon']}
        db.artifacts.replace_one({'remote_id': spell_id}, entry, upsert=True)

def test_artifacts():
    mongo = pymongo.MongoClient()
    populate_db(mongo.roguesim_python)
    
if __name__ == '__main__':
    test_artifacts()
