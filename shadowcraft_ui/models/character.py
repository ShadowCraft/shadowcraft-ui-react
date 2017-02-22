import hashlib
import json
import jsonschema
import pymongo
import traceback
from ..wow_armory.ArmoryCharacter import ArmoryCharacter

CHARACTER_DATA_VERSION = 2

# TODO: is there any reason for this to actually be an object? Do we ever edit a character
# and save it again? Can this just be one class (not object) method that returns json? That
# seems more realistic. The code to save a character as a sha could go in here too.

def load(db, region, realm, name, sha=None, refresh=False):

    char_data = None
    if sha:
        # If we're loading from a sha, check to see if that sha is in the db.
        # If it's there, load that data. If it's not, force a refresh.
        results = db.history.find({'sha':sha})
        if results.count() != 0:
            char_data = results[0]['json']
        else:
            print("Failed to find SHA value in the database, will attempt to load character from Armory")
            refresh = True

    if not refresh:
        # Check to see if the character is in the database. If it's there, load
        # it and return.
        query = {'region':region, 'realm': realm, 'name':name}
        results = db.characters.find(query)
        if results.count() != 0:
            char_data = results[0]

    # Check if the character data version from the database is still current. If it's not,
    # ignore the data from the database and load something new from the armory. This lets
    # us make changes to the character data layout and not break the UI every time.
    if char_data is not None:
        if 'data_version' not in char_data or char_data['data_version'] != CHARACTER_DATA_VERSION:
            char_data = None

    if char_data is None:
        # If we haven't gotten data yet, we need to try to reload it from the
        # armory.
        try:
            char = ArmoryCharacter(name, realm, region)
            char_data = char.as_json()
            char_data['data_version'] = CHARACTER_DATA_VERSION
        except Exception as error:
            char_data = None
            print("Failed to load character data for %s/%s/%s: %s" % (region, realm, name, error))
            traceback.print_exc()

        if char_data != None:
            # Store it in the database
            db.characters.replace_one({'region':region, 'realm':realm, 'name':name},
                                      char_data, upsert=True)

    return char_data

def get_sha(db, char_data):
    # TODO: load the schema from disk

    # load the schema and validate this data against it
    schema = {
        "type" : "object",
        "properties" : {
            "value" : {"type": "number"},
        },
    }

    try:
        jsonschema.validate(char_data, schema)
    except jsonschema.ValidationError as error:
        print("Character data failed validation: %s" % error)
    except jsonschema.SchemaError as error:
        print("JSON schema error: %s" % error)
    else:
        # Generate a sha1 hash of the data
        sha = hashlib.sha1(json.dumps(char_data).encode('utf-8')).hexdigest()

        # store the hash in the database, making sure to set the expiration on it
        # so that mongo automatically removes it after a set amount of time.
        db.history.replace_one({'sha':sha}, {'sha':sha, 'json':char_data}, upsert=True)
        return {'sha': sha}

    return {}

def init_db(db):
    db.characters.create_index([("region", pymongo.ASCENDING),
                                ("realm", pymongo.ASCENDING),
                                ("name", pymongo.ASCENDING)], unique=True)
    db.history.create_index("sha", unique=True, expireAfterSeconds=1209600)

def test_character():
    from pymongo import MongoClient
    db = MongoClient()['roguesim_python']

    init(db)

    load(db, 'us', 'aerie-peak', 'tamen', sha='12345')
    data2 = load(db, 'us', 'aerie-peak', 'tamen')
    data3 = load(db, 'us', 'aerie-peak', 'tamen', refresh=True)

    sha = get_sha(db, data3)
    data4 = load(db, 'us', 'aerie-peak', 'tamen', sha=sha['sha'])
    print(data2 == data4)

if __name__ == '__main__':
    test_character()
