import pymongo
from wow_armory import ArmoryTalents

def init_db(db):
    db.talents.create_index([('remote_id', pymongo.ASCENDING)], unique=True)

def populate_db(db):
    talents = ArmoryTalents.get('us')
    for spec, spec_talents in talents.items():
        for talent in spec_talents:
            entry = {'remote_id': int(talent['spell']),
                     'spec': spec,
                     'name': talent['name'],
                     'icon': talent['icon'],
                     'tier': int(talent['tier']),
                     'column': int(talent['column'])}
            db.characters.replace_one({'remote_id': entry['remote_id']},
                                      entry, upsert=True)

def test_talents():
    mongo = pymongo.MongoClient()
    populate_db(mongo.roguesim_python)
    
if __name__ == '__main__':
    test_talents()
