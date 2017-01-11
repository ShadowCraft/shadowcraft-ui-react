from wow_armory.ArmoryCharacter import ArmoryCharacter
from bson.json_util import dumps
import hashlib
import jsonschema
import json
import pymongo

# TODO: is there any reason for this to actually be an object? Do we ever edit a character
# and save it again? Can this just be one class (not object) method that returns json? That
# seems more realistic. The code to save a character as a sha could go in here too.

def load(mongo, region, realm, name, sha=None, refresh=False):

    char_data = None
    if sha:
        # If we're loading from a sha, check to see if that sha is in the db.
        # If it's there, load that data. If it's not, force a refresh.
        results = mongo.history.find({'sha':sha})
        print(results.count())
        if results.count() != 0:
            print(results[0])
            char_data = results[0]['json']
        else:
            print("Failed to find SHA value in the database, will attempt to load character from Armory")
            refresh = True

    if not refresh:
        # Check to see if the character is in the database. If it's there, load
        # it and return.
        query = {'region':region, 'realm': realm, 'name':name}
        results = mongo.characters.find(query)
        if results.count() != 0:
            char_data = results[0]

    if char_data == None:
        # If we haven't gotten data yet, we need to try to reload it from the
        # armory.
        try:
            char = ArmoryCharacter(name, realm, region)
            char_data = char.as_json()
        except Exception as e:
            char_data = None
            print("Failed to load character data for %s/%s/%s: %s" % (region, realm, name, e))

        if char_data != None:
            # Store it in the database
            mongo.characters.replace_one({'region':region,'realm':realm,'name':name},
                                         char_data, upsert=True)

    return char_data

def get_sha(mongo, char_data):
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
    except jsonschema.ValidationError as e:
        print("Character data failed validation: %s" % e.string())
    except jsonschema.SchemaError as e:
        print("JSON schema error: %s" % e.string())
    except:
        print("Unknown exception thrown while getting SHA")
    else:
        # Generate a sha1 hash of the data
        sha = hashlib.sha1(json.dumps(char_data).encode('utf-8')).hexdigest()

        # store the hash in the database, making sure to set the expiration on it
        # so that mongo automatically removes it after a set amount of time.
        mongo.history.replace_one({'sha':sha},{'sha':sha,'json':char_data},upsert=True)
        return {'sha': sha}

    return {}

def init(mongo):
    mongo.characters.create_index([("region", pymongo.ASCENDING),
                                   ("realm", pymongo.ASCENDING),
                                   ("name", pymongo.ASCENDING)], unique=True)
    mongo.history.create_index("sha", unique=True, expireAfterSeconds=1209600)

if __name__ == '__main__':
    from pymongo import MongoClient
    mongo = MongoClient()['roguesim_development']

    init(mongo)

    data1 = load(mongo, 'us', 'aerie-peak', 'tamen', sha='12345')
    data2 = load(mongo, 'us', 'aerie-peak', 'tamen')
    data3 = load(mongo, 'us', 'aerie-peak', 'tamen', refresh=True)

    sha = get_sha(mongo, data3)
    data4 = load(mongo, 'us', 'aerie-peak', 'tamen', sha=sha['sha'])
    print(data2 == data4)
