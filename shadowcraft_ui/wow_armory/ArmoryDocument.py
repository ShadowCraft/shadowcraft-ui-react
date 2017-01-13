# -*- coding: utf-8 -*-

import re
import os
import requests

class ArmoryException(Exception):
    error_msg = ''
    def __init(self, msg):
        self.error_msg = msg
    def __str__(self):
        return str(self.error_msg)

class ArmoryError(ArmoryException):
    pass
class MissingDocument(ArmoryException):
    pass

def get(region, path, params=None):
    if region in ['us', 'eu', 'kr', 'tw', 'sea']:
        host = '%s.api.battle.net' % region
    elif region == 'cn':
        host = 'www.api.battlenet.com.cn'
    else:
        host = 'us.api.battle.net'

    if params is None:
        params = {}

    # TODO
    params['apikey'] = os.environ['BLIZZARD_API_KEY']
    url = 'https://%s%s' % (host, path)
    headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'}

    tries = 0
    while tries < 3:
        try:
            resp = requests.get(url, params=params, timeout=7, headers=headers)
            if resp.status_code >= 400 and resp.status_code < 500:
                raise ArmoryMissingDocument('Armory returned %d' % resp.status_code)
            elif resp.status_code >= 500:
                raise ArmoryError('Armory returned %d' % resp.status_code)

            json = resp.json()
            if len(json) == 0:
                raise ArmoryError('Armory returned empty data')
            return json
        except requests.RequestException:
            if tries < 3:
                tries += 1
            else:
                raise

def normalize_realm(realm):
    new_realm = realm.lower()
    new_realm = re.sub(r"['’]", '', new_realm)
    new_realm = re.sub(r" ", '-', new_realm)
    new_realm = re.sub(r"[àáâãäå]", 'a', new_realm)
    new_realm = re.sub(r"[ö]", 'o', new_realm)
    return new_realm

def normalize_character(character):
    return character.lower()

def test_document():
    params = {'fields': 'items'}
    print(normalize_realm("Aerie Peak"))
    print(get('us', '/wow/character/aerie-peak/tamen', params))

if __name__ == '__main__':
    test_document()
