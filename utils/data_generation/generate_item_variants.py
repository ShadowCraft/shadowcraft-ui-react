#!/usr/bin/python

import re
import requests

USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'

def get_ids_from_wowhead(url):
    """Loads a list of item IDs from wowhead based on a wowhead URL"""
    ids = []
    resp = requests.get(
        url,
        timeout=60,
        headers={'user-agent': USER_AGENT}
    )
    if resp.status_code == 200:
        match_iter = re.finditer(r'_\[(\d+)\]=\{.*?\}', resp.text)
        for match in match_iter:
            ids.append(int(match.groups(1)[0]))

    return sorted(ids)

if __name__ == '__main__':

    urls = [
        { "name": "Emerald Nightmare",
          "url": "http://www.wowhead.com/armor/class:4/type:2:-3:-6:-2:-4?filter=214;8026;0",
          "ilvls": [835, 850, 865, 880] },
        { "name": "Trial of Valor",
          "url": "http://www.wowhead.com/armor/class:4/type:2:-3:-6:-2:-4?filter=214;8440;0",
          "ilvls": [845, 860, 870, 890] },
        { "name": "Nighthold",
          "url": "http://www.wowhead.com/armor/class:4/type:2:-3:-6:-2:-4?filter=214;8025;0",
          "ilvls": [865, 880, 895, 910] },
        { "name": "Tomb of Sargeras",
          "url": "http://www.wowhead.com/armor/class:4/type:2:-3:-6:-2:-4?filter=214;8524;0",
          "ilvls": [885, 900, 915, 930] },
        { "name": "Dungeons",
          "url": "http://www.wowhead.com/armor/class:4/type:2:-3:-6:-2:-4?filter=166:220;7:-2323;0:0",
          "ilvls": [790, 845, 865, 885] },
        # { "name": "",
        #   "url": "",
        #   "ilvls": [] },
    ]

    

    print("// Item variants for ItemSelectPopup")
    print("export const ITEM_VARIANTS = [")

    for urlset in urls:
        items = get_ids_from_wowhead(urlset['url'])
        print("")
        print("    // %s" % urlset['name'])
        print("    [%s, %s]," % (str(items), str(urlset['ilvls'])))

    print("];")
