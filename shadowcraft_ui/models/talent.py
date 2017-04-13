"""defines the data model for talents in mongo"""
import pymongo
from wow_armory import ArmoryTalents


def init_db(mdb):
    """define index on remote_id"""
    mdb.talents.create_index([('remote_id', pymongo.ASCENDING)], unique=True)


def populate_db(mdb):
    """get the data from bnet and store it in mongo"""
    talents = ArmoryTalents.get('us')
    for spec, spec_talents in talents.items():
        for talent in spec_talents:
            entry = {'remote_id': int(talent['spell']),
                     'spec': spec,
                     'name': talent['name'],
                     'icon': talent['icon'],
                     'tier': int(talent['tier']),
                     'column': int(talent['column'])}
            mdb.characters.replace_one(
                {'remote_id': entry['remote_id']},
                entry,
                upsert=True
            )


def test_talents():
    """populate talent data for testing"""
    mongo = pymongo.MongoClient()
    populate_db(mongo.roguesim_python)

if __name__ == '__main__':
    test_talents()
