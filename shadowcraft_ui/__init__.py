# -*- coding: utf-8 -*-
"""a collection of functions that fetch data from our db"""
from .models import character


def get_character_data(mongo, region, realm, name, sha=None):
    """this will get a character from the db, fetching from bnet if needed"""
    print("get data: %s %s %s %s" % (region, realm.encode('utf-8','ignore'), name.encode('utf-8','ignore'), sha))
    return character.load(mongo.db, region, realm, name, sha=sha)


def get_debug_sha(mongo, character_json):
    """generates and returns a sha for a set of character/settings data. used for debugging peoples' problems"""
    print("get debug sha: %s" % character_json)
    return character.get_sha(mongo.db, character_json)


if __name__ == '__main__':
    print("test")
