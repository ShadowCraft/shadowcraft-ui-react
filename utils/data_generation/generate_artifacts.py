#!/usr/bin/python

# This script creates artifact layout data using data from wowhead. It should be
# run every time Blizzard changes the layout of the artifact calculators. The
# output from this script should be copied into
# shadowcraft-ui/js/artifact/ArtifactLayouts.js. This script requries a few
# external libraries to be installed:
#
# PhantomJS:
# Install PhantomJS from whatever package system you use (the binary needs to exist)
#
# Python modules:
# Install selenium/BeautifulSoup: pip install selenium bs4
#
# Huge thanks to wowhead for the layout data for these calculators. I generated
# the first set of layouts by hand so I know how much effort it is to get these
# things to look right.
#
# Usage:
#
# To load data from wowhead:
#    ./generate_artifacts.py --fetchdata
#
# To generate output layouts from fetched data:
# Pass an argument for the type of artifact: --db, --ks, or --fangs
# Example:
#    ./generate_artifacts.py --db

import math
import sys
import time
import json
import re

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from bs4 import BeautifulSoup

FRAME_HEIGHT = 615
FRAME_WIDTH = 720

def getLineInfo(icon1, icon2, height, width):
    # adjust the corner points of each icon down and to the right 40 pixels since the outer div
    # of each icon is 80 pixels wide and tall.
    pos1 = (icon1['x']+40, icon1['y']+40)
    pos2 = (icon2['x']+40, icon2['y']+40)

    (dx, dy) = (pos2[0]-pos1[0], pos2[1]-pos1[1])
    length = int(round(math.sqrt(float(math.pow(math.fabs(dx), 2)+(math.pow(math.fabs(dy), 2))))))
    angle = math.degrees(math.atan2(dy, dx))

    # from the midpoint, we need to put the upper left corner of the div half of the length to
    # the left and half of the height from the right (plus a little bit of fine tuning)
    midpoint = ((pos1[0]+pos2[0])/2, (pos1[1]+pos2[1])/2)
    left = (midpoint[0]-(length/2)+5) / float(width) * 100.0
    top = (midpoint[1]+2) / float(height) * 100.0

    return [length, left, top, angle]

def generateData(datafile, iconmap, linemap, idmap):
    try:
        f = open(datafile, "r")
    except IOError:
        print('Data needs to be fetched from wowhead before running this script:')
        print('   ./generate_artifacts.py --fetchdata')
        sys.exit(0)

    core = BeautifulSoup(f.read(), 'html.parser')
    f.close()
    traits = core.find_all(lambda tag: tag.name == 'a' and tag.get('data-artifact-id'))

    power_to_id = {}
    for t in traits:

        styles = {}
        for style in t['style'].split(';'):
            style = style.strip()
            if len(style) == 0:
                continue
            s = style.split(':')
            k = s[0].strip()
            v = float(s[1].strip()[:-1])
            styles[k] = v

        spell_id = int(t['href'].split('=')[1].split('&')[0])
        icondiv = t.find_all(lambda tag: tag.name == 'div' and tag.get('class') and
                             tag.get('class') == ['artifactcalc-sprite-icon'])
        icon = icondiv[0]['style'].split('/')[-1].split('.')[0]
        maxlevel = int(t['data-max-level'])

        ring = ""
        for c in t['class']:
            if 'PerkRing' in c:
                if 'MainProc' in c:
                    ring = 'thick'
                elif 'GoldMedal' in c:
                    ring = 'dragon'
                elif 'Small' in c:
                    ring = 'thin'

        iconmap[idmap[spell_id][0]] = {
            'name': idmap[spell_id][1],
            'icon': icon,
            'x': int(round((styles['left'] / 100.0) * float(FRAME_WIDTH))) + 45,
            'y': int(round((styles['top'] / 100.0) * float(FRAME_HEIGHT))) + 45,
            'id': spell_id,
            'max_rank': maxlevel,
            'ring': ring,
        }

        # If this is a thin-ring icon, we need to move it up and to the left slightly so that
        # it matches the layout on wowhead a bit better.
        if ring == 'thin':
            iconmap[idmap[spell_id][0]]['x'] -= 15
            iconmap[idmap[spell_id][0]]['y'] -= 15
            iconmap[idmap[spell_id][0]]['relic'] = True
        else:
            iconmap[idmap[spell_id][0]]['relic'] = False

        # Generate a map of spell ID to wowhead power ID to use when building lines
        power_id = t['data-power-id']
        power_to_id[power_id] = idmap[spell_id][0]

    lines = core.find_all(lambda tag: tag.name == 'div' and tag.get('data-power-from-to'))
    for l in lines:
        from_to = l['data-power-from-to'].split('-')
        line = {'trait1': power_to_id[from_to[0]],
                'trait2': power_to_id[from_to[1]]}
        linemap.append(line)

def scale(y, old_min, old_max, new_min, new_max):
    return (((float(new_max)-float(new_min))*(float(y)-float(old_min))) /
            (float(old_max)-float(old_min))) + float(new_min)

def get_db_data():

    DATA = {
        'artifact': 'dreadblades',
        'artifact_name': 'The Dreadblades',
        'artifact_icon': 'inv_sword_1h_artifactskywall_d_01',
        'primary_trait': 202665,
        'paragon_trait': 214929,
        'relics': ['Blood', 'Iron', 'Storm']
    }

    ICONS = {}
    LINES = []

    spell_id_map = {
        202665: ["db_curse", "Curse of the Dreadblades"],
        202897: ["db_blunderbuss", "Blunderbuss"],
        202769: ["db_blurredtime", "Blurred Time"],
        202820: ["db_greed", "Greed"],
        202507: ["db_bladedancer", "Blade Dancer"],
        202628: ["db_blademaster", "Blademaster"],
        202463: ["db_cursededges", "Cursed Edges"],
        202521: ["db_fortunesstrike", "Fortune's Strike"],
        202755: ["db_deception", "Deception"],
        202524: ["db_fatebringer", "Fatebringer"],
        202514: ["db_fatesthirst", "Fate's Thirst"],
        202530: ["db_fortunestrikes", "Fortune Strikes"],
        202907: ["db_fortunesboon", "Fortune's Boon"],
        202533: ["db_ghostlyshell", "Ghostly Shell"],
        202522: ["db_gunslinger", "Gunslinger"],
        202753: ["db_hiddenblade", "Hidden Blade"],
        216230: ["db_blackpowder", "Black Powder"],
        214929: ["db_cursedsteel", "Cursed Steel"],
        241153: ["db_silence", "Bravado of the Uncrowned"],
        238067: ["db_sabermetrics", "Sabermetrics"],
        238103: ["db_dreadbladesvigor", "Dreadblade's Vigor"],
        238139: ["db_loadeddice", "Loaded Dice"],
        239042: ["db_concordance", "Concordance of the Legionfall"]
    }

    generateData('dreadblades_data.txt', ICONS, LINES, spell_id_map)
    DATA['traits'] = ICONS
    DATA['lines'] = LINES
    return DATA

def get_ks_data():

    DATA = {
        'artifact': 'kingslayers',
        'artifact_name': "The Kingslayers",
        'artifact_icon': "inv_knife_1h_artifactgarona_d_01",
        'primary_trait': 192759,
        'paragon_trait': 214928,
        'relics': ["Shadow", "Iron", "Blood"]
    }

    ICONS = {}
    LINES = []

    spell_id_map = {
        192759: ["ks_kingsbane", "Kingsbane"],
        192657: ["ks_bagoftricks", "Bag of Tricks"],
        192428: ["ks_fromtheshadows", "From the Shadows"],
        192923: ["ks_bota", "Blood of the Assassinated"],
        192310: ["ks_toxicblades", "Toxic Blades"],
        192318: ["ks_masteralchemist", "Master Alchemist"],
        192424: ["ks_surgeoftoxins", "Surge of Toxins"],
        192349: ["ks_masterassassin", "Master Assassin"],
        192422: ["ks_shadowswift", "Shadow Swiftness"],
        192345: ["ks_shadowwalker", "Shadow Walker"],
        192384: ["ks_urgetokill", "Urge to Kill"],
        192315: ["ks_serratededge", "Serrated Edge"],
        192326: ["ks_balancedblades", "Balanced Blades"],
        192323: ["ks_fadeintoshadows", "Fade into Shadows "],
        192329: ["ks_gushingwound", "Gushing Wound"],
        192376: ["ks_poisonknives", "Poison Knives"],
        214928: ["ks_slayersprecision", "Slayer's Precision"],
        214368: ["ks_assassinsblades", "Assassin's Blades"],
        241152: ["ks_silence", "Silence of the Uncrowned"],
        238066: ["ks_strangler", "Strangler"],
        238102: ["ks_denseconcoction", "Dense Concoction"],
        238138: ["ks_sinistercirculation", "Sinister Circulation"],
        239042: ["ks_concordance", "Concordance of the Legionfall"]
    }

    generateData('kingslayers_data.txt', ICONS, LINES, spell_id_map)
    DATA['traits'] = ICONS
    DATA['lines'] = LINES
    return DATA

def get_fangs_data():

    DATA = {
        'artifact': 'fangs',
        'artifact_name': 'Fangs of the Devourer',
        'artifact_icon': 'inv_knife_1h_artifactfangs_d_01',
        'primary_trait': 209782,
        'paragon_trait': 214930,
        'relics': ["Fel", "Shadow", "Fel"]
    }

    ICONS = {}
    LINES = []

    spell_id_map = {
        209782: ["fangs_goremawsbite", "Goremaw's Bite"],
        209781: ["fangs_shadownova", "Shadow Nova"],
        209835: ["fangs_akaarissoul", "Akaari's Soul"],
        197406: ["fangs_finality", "Finality"],
        197239: ["fangs_energetic", "Energetic Stabbing"],
        197244: ["fangs_ghostarmor", "Ghost Armor"],
        197241: ["fangs_catlike", "Catlike Reflexes"],
        197386: ["fangs_soulshadows", "Soul Shadows"],
        197234: ["fangs_gutripper", "Gutripper"],
        197231: ["fangs_quietknife", "The Quiet Knife"],
        197256: ["fangs_flickering", "Flickering Shadows"],
        197610: ["fangs_second", "Second Shuriken"],
        197233: ["fangs_demonskiss", "Demon's Kiss"],
        197235: ["fangs_precision", "Precision Strike"],
        197604: ["fangs_embrace", "Embrace of Darkness"],
        197369: ["fangs_fortunesbite", "Fortune's Bite"],
        214930: ["fangs_legionblade", "Legionblade"],
        221856: ["fangs_shadowfangs", "Shadow Fangs"],
        241154: ["fangs_shadows", "Shadows of the Uncrowned"],
        238068: ["fangs_etchedinshadow", "Etched in Shadow"],
        242707: ["fangs_shadowswhisper", "Shadow's Whisper"],
        238140: ["fangs_feedingfrenzy", "Feeding Frenzy"],
        239042: ["fangs_concordance", "Concordance of the Legionfall"]
    }

    generateData('fangs_data.txt', ICONS, LINES, spell_id_map)
    DATA['traits'] = ICONS
    DATA['lines'] = LINES

    return DATA

def fetch_data():
    dcap = dict(DesiredCapabilities.PHANTOMJS)
    dcap["phantomjs.page.settings.userAgent"] = (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/53 "
        "(KHTML, like Gecko) Chrome/15.0.87"
    )

    # Create a PhantomJS web driver to load the pages including executing all of
    # the javascript on the page.
    browser = webdriver.PhantomJS(desired_capabilities=dcap)

    browser.get('http://ptr.wowhead.com/artifact-calc/rogue/outlaw/AgXiIsA')
    time.sleep(2)
    source = browser.page_source
    soup = BeautifulSoup(source, 'html.parser')
    core = soup.find('div', class_='artifactcalc-core')

    f = open('dreadblades_data.txt', 'w')
    f.write(str(core))
    f.close()

    browser.get('http://ptr.wowhead.com/artifact-calc/rogue/assassination/AvTSIrA')
    time.sleep(2)
    source = browser.page_source
    soup = BeautifulSoup(source, 'html.parser')
    core = soup.find('div', class_='artifactcalc-core')

    f = open('kingslayers_data.txt', 'w')
    f.write(str(core))
    f.close()

    browser.get('http://ptr.wowhead.com/artifact-calc/rogue/subtlety/AlIxIRA')
    time.sleep(2)
    source = browser.page_source
    soup = BeautifulSoup(source, 'html.parser')
    core = soup.find('div', class_='artifactcalc-core')

    f = open('fangs_data.txt', 'w')
    f.write(str(core))
    f.close()

    browser.quit()
    sys.exit(0)

def dump_output(data):
    print('export const %s_layout = {' % data['artifact'])
    print('    artifact: \'%s\',' % data['artifact'])
    print('    artifact_name: \'%s\',' % data['artifact_name'])
    print('    artifact_icon: \'%s\',' % data['artifact_icon'])
    print('    primary_trait: %d,' % data['primary_trait'])
    print('    paragon_trait: %d,' % data['paragon_trait'])
    print('    relics: ', end='')
    print(data['relics'], end='')
    print(',')
    print('    traits: {')

    index = 0
    for key, value in data['traits'].items():
        print('        \'%s\': ' % key, end='')
        dump = re.sub(r'^(\s+)"(.+)":', r'\1\2:', json.dumps(value, indent=12), flags=re.M)
        dump = re.sub(r'\'', r'\'', dump, flags=re.M)
        dump = re.sub(r'"', r"'", dump, flags=re.M)
        if index == len(data['traits'])-1:
            dump = re.sub(r'^}$', r'        }', dump, flags=re.M)
        else:
            dump = re.sub(r'^}$', r'        },', dump, flags=re.M)
        print(dump)
        index += 1

    print('    },')
    print('    lines: ', end='')
    dump = re.sub(r'^(\s+)"(.+)":', r'\1\2:', json.dumps(data['lines'], indent=8), flags=re.M)
    dump = re.sub(r'^]$', r'    ]', dump, flags=re.M)
    dump = re.sub(r'\'', r'\'', dump, flags=re.M)
    dump = re.sub(r'"', r"'", dump, flags=re.M)
    dump = re.sub(r'               ', '           ', dump, flags=re.M)
    print(dump)
    print('};')
    print()

    ranking_layout = []

    layout = {
        'name': '',
        'items': []
    }
    for key, trait in data['traits'].items():
        item = {
            'name': trait['name'],
            'id': trait['id']
        }
        layout['items'].append(item)

    ranking_layout.append(layout)

    print('export const %s_ranking = ' % data['artifact'], end='')
    dump = re.sub(r'^(\s+)"(.+)":', r'\1\2:', json.dumps(ranking_layout, indent=4), flags=re.M)
    dump = re.sub(r'\'', r'\'', dump, flags=re.M)
    dump = re.sub(r'"', r"'", dump, flags=re.M)
    print(dump, end='')
    print(';')
    print()

if len(sys.argv) == 1:
    dump_output(get_ks_data())
    dump_output(get_db_data())
    dump_output(get_fangs_data())
elif sys.argv[1] == '--db':
    dump_output(get_db_data())
elif sys.argv[1] == '--ks':
    dump_output(get_ks_data())
elif sys.argv[1] == '--fangs':
    dump_output(get_fangs_data())
elif sys.argv[1] == '--fetchdata':
    fetch_data()
