# This script generates talent data from wowhead. It generally shouldn't be necessary
# once an expansion is released because we usually get talent data from the Blizzard
# API and use that instead. The output from this script should be copied into
# lib/wow_armory/talents.coffee. The script requires a few external libraries to be
# installed:
#
# PhantomJS:
# Install phantomjs using whatever package system you prefer
#
# Python modules:
# Install selenium/BeautifulSoup: pip install selenium bs4 requests
#
# It will also pull data from the Blizzard API if requested, building the same output
# as the wowhead output. To use the Blizzard API, you need to fill in the
# BLIZZARD_API_KEY constant below.

import sys
import time
import requests

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from bs4 import BeautifulSoup

BLIZZARD_API_KEY = 'wwa5krsuf4m4yzuu7qtrd42natfu2an2'

def output_data(talent_data):
    tiers = ['Tier 15', 'Tier 30', 'Tier 45', 'Tier 60', 'Tier 75', 'Tier 90', 'Tier 100']
    specs = ['assassination', 'outlaw', 'subtlety']
    for spec in talent_data:
        data = talent_data[spec]
        print('export const %s_layout = {' % specs[spec])
        print('    name: \'%s\',' % data['name'])
        print('    icon: \'%s\',' % data['icon'])
        print('    talents: [')

        data['talents'] = sorted(data['talents'], key=lambda x: (x['row'], x['col']))
        for talent_idx, talent in enumerate(data['talents']):
            print('        {')
            print('            row: %d,' % talent['row'])
            print('            col: %d,' % talent['col'])
            print('            icon: \'%s\',' % talent['icon'])
            print('            id: %d' % talent['id'])
            if talent_idx != (len(data['talents'])-1):
                print('        },')
            else:
                print('        }')
        print('    ]')
        print('};')
        print()

        print('export const %s_ranking = [' % specs[spec])
        for tier in range(0, 7):
            talents = [x for x in data['talents'] if x['row'] == tier]
            print('    {')
            print('        name: \'%s\',' % tiers[tier])
            print('        items: [')
            for talent_idx, talent in enumerate(talents):
                print('            {')
                print('                name: \'%s\',' % talent['name'])
                print('                id: \'%s\'' % talent['name'].lower().replace(' ', '_'))
                if talent_idx != (len(talents)-1):
                    print('            },')
                else:
                    print('            }')

            print('        ]')
            if tier != 6:
                print('    },')
            else:
                print('    }')
        print('];')
        print()

# This function is used at the end to make generating the output for javascript more
# generic. This takes the element from BeautifulSoup and scrapes the talent data for
# any given spec.
def build_wowhead(source, name, spec_icon):
    talent_data = {
        'name': name,
        'icon': spec_icon,
        'talents': [],
    }

    talents = source.select('div[cursor="pointer"]')
    for talent in talents:

        t = {
            'row': int(talent['data-row']),
            'col': int(talent['data-col']),
            'name': talent.select('td')[0].text,
            'icon': '',
            'id': int(talent.select('a[class="screen"]')[0]['href'].split('=')[1])
        }

        # Talents are indexed starting at 1 in the engine. Changing them to be the same here
        # makes a lot of life easier in the UI code.
        t['col'] += 1

        icon = talent.select('ins')[0].get('style')
        icon = icon.split('/')[-1]
        icon = icon.split('.jpg')[0]
        t['icon'] = icon

        talent_data['talents'].append(t)
    return talent_data

def load_data(source):
    if source == '--wowhead':

        dcap = dict(DesiredCapabilities.PHANTOMJS)
        dcap["phantomjs.page.settings.userAgent"] = (
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/53 "
            "(KHTML, like Gecko) Chrome/15.0.87"
        )

        # Create a PhantomJS web driver to load the pages including executing all of
        # the javascript on the page.
        browser = webdriver.PhantomJS(desired_capabilities=dcap)

        # Scrape the three talent trees into strings and use BeautifulSoup to grab
        # just the element we want from each of them.
        browser.get('http://bfa.wowhead.com/talent-calc/rogue/assassination')
        time.sleep(2)
        source = browser.page_source
        soup = BeautifulSoup(source, 'html.parser')
        assassination = soup.find('div', class_='talentcalc-core')

        browser.get('http://bfa.wowhead.com/talent-calc/rogue/outlaw')
        time.sleep(2)
        source = browser.page_source
        soup = BeautifulSoup(source, 'html.parser')
        outlaw = soup.find('div', class_='talentcalc-core')

        browser.get('http://bfa.wowhead.com/talent-calc/rogue/subtlety')
        time.sleep(2)
        source = browser.page_source
        soup = BeautifulSoup(source, 'html.parser')
        subtlety = soup.find('div', class_='talentcalc-core')
        browser.quit()

        talent_data = {
            0: build_wowhead(assassination, 'Assassination', 'ability_rogue_deadlybrew'),
            1: build_wowhead(outlaw, 'Outlaw', 'inv_sword_30'),
            2: build_wowhead(subtlety, 'Subtlety', 'ability_stealth')
        }

        return talent_data

    elif source == '--blizzard':

        headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'}
        params = {'apikey': BLIZZARD_API_KEY,
                  'locale': 'en_US'}

        url = 'https://us.api.battle.net/wow/data/talents'
        resp = requests.get(url, params=params, timeout=7, headers=headers)
        json = resp.json()
        rogue_talents = json['4']

        talent_data = {}
        for spec in rogue_talents['specs']:
            talent_data[spec['order']] = {
                'name': spec['name'],
                'icon': spec['icon'],
                'talents': []
            }

        for row_index, row in enumerate(rogue_talents['talents']):
            for col_index, col_talents in enumerate(row):
                order0 = None
                order1 = None
                order2 = None

                for spec_index, spec_talent in enumerate(col_talents):
                    t = {
                        'row': spec_talent['tier'],
                        'col': spec_talent['column'],
                        'name': spec_talent['spell']['name'],
                        'icon': spec_talent['spell']['icon'],
                        'id': spec_talent['spell']['id']
                    }

                    # Talents are indexed starting at 1 in the engine. Changing them to be the same here
                    # makes a lot of life easier in the UI code.
                    t['col'] += 1

                    if 'spec' in spec_talent:
                        if spec_talent['spec']['order'] == 0:
                            order0 = t
                        elif spec_talent['spec']['order'] == 1:
                            order1 = t
                        elif spec_talent['spec']['order'] == 2:
                            order2 = t
                    else:
                        if order0 == None:
                            order0 = t
                        if order1 == None:
                            order1 = t
                        if order2 == None:
                            order2 = t

                talent_data[0]['talents'].append(order0)
                talent_data[1]['talents'].append(order1)
                talent_data[2]['talents'].append(order2)

        return talent_data

data = load_data(sys.argv[1])
output_data(data)
