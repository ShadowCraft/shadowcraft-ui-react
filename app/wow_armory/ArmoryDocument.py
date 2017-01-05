# -*- coding: utf-8 -*-

import requests,re,os

class ArmoryException(Exception):
    def __init(self, error_msg):
        self.error_msg = error_msg
    def __str__(self):
        return str(self.error_msg)

class ArmoryError(ArmoryException): pass
class ArmoryMissingDocument(ArmoryException): pass

class ArmoryDocument(object):
    def get(region, path, params = {}):
        if region == 'us': host = 'us.api.battle.net'
        elif region == 'eu': host = 'eu.api.battle.net'
        elif region == 'kr': host = 'kr.api.battle.net'
        elif region == 'tw': host = 'tw.api.battle.net'
        elif region == 'cn': host = 'www.api.battlenet.com.cn'
        elif region == 'sea': host = 'sea.api.battle.net'
        else: host = 'us.api.battle.net'

        # TODO
        params['apikey'] = os.environ['BLIZZARD_API_KEY']
        url = 'https://%s%s' % (host, path)
        headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'}
        
        tries = 0
        while (tries < 3):
            try:
                r = requests.get(url, params=params, timeout=7, headers=headers)
                if r.status_code >= 400 and r.status_code < 500:
                    raise ArmoryMissingDocument('Armory returned %d' % r.status_code)
                elif r.status_code >= 500:
                    raise ArmoryError('Armory returned %d' % r.status_code)

                json = r.json()
                if len(json) == 0:
                    raise ArmoryError('Armory returned empty data')
                return json
            except RequestException:
                if tries < 3:
                    tries += 1
                else:
                    raise

    def normalize_realm(realm):
        r = realm.lower()
        r = re.sub(r"['’]", '', r)
        r = re.sub(r" ", '-', r)
        r = re.sub(r"[àáâãäå]", 'a', r)
        r = re.sub(r"[ö]", 'o', r)
        return r

    def normalize_character(character):
      return character.lower()

if __name__ == '__main__':
    print (ArmoryDocument.normalize_realm("Aerie Peak"))

    params = {'fields': 'items'}
    print (ArmoryDocument.get('us','/wow/character/aerie-peak/tamen', params))
