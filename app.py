# I needed this to make things work with python 3.6. No idea why, but it shouldn't
# hurt anything else.
from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template, url_for, redirect, json, jsonify
from flask_socketio import SocketIO
from flask_pymongo import PyMongo
from werkzeug.routing import BaseConverter
import shadowcraft_ui
from bson import json_util

app = Flask('shadowcraft_ui')
app.config['SECRET_KEY'] = 'shhhhhhhh!'
app.config['MONGO_DBNAME'] = 'roguesim_python'
socketio = SocketIO(app)
mongo = PyMongo(app)

class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]
app.url_map.converters['regex'] = RegexConverter

@app.route('/')
def main():
    return render_template('index.html')

# Main route for the application. Loads a character.
@app.route('/<regex("(us|eu|kr|tw|cn|sea)"):region>/<realm>/<name>')
def character_show(region, realm, name):
    data = shadowcraft_ui.get_character_data(mongo, region, realm, name)
    character_json = json.dumps(data, indent=4, default=json_util.default)
    return render_template('index.html', character_json=character_json)

# Refreshes a character from the armory and redirects to the main route.
# TODO: Flask adds a "redirecting" page before redirecting. Is there a way
# to keep it from doing that?
@app.route('/<regex("(us|eu|kr|tw|cn|sea)"):region>/<realm>/<name>/refresh')
def character_refresh(region, realm, name):
    shadowcraft_ui.refresh_character(mongo, region, realm, name)
    url = url_for('character_show', region=region, realm=realm, name=name)
    return redirect(url)

# Requests a character page based on a saved sha value.
@app.route('/<regex("(us|eu|kr|tw|cn|sea)"):region>/<realm>/<name>/#!/<sha>')
def character_sha(region, realm, name, sha):
    shadowcraft_ui.get_character_data(mongo, region, realm, name, sha=sha)
    url = url_for('character_show', region=region, realm=realm, name=name)
    return redirect(url)

# TODO: are these really necessary? Can't we just return 400/500 errors when
# necessary and configure flask to handle them as such?
@app.route('/error')
def error():
    return render_template('500.html')

@app.route('/missing')
def missing():
    return render_template('404.html')

@app.route('/settings')
def settings():
    dummy_data = [
        {
            'spec': 'a',
            'heading': 'Assassination Rotation Settings',
            'items': [
                {
                    'label': 'Kingsbane w/ Vendetta',
                    'description': '',
                    'type': 'dropdown',
                    'active': "Use cooldown if it aligns, but don't delay usage",
                    'options': [
                        "Use cooldown if it aligns, but don't delay usage",
                        'Only use cooldown with Vendetta',
                    ]
                },
                {
                    'label': 'Exsang w/ Vendetta',
                    'description': '',
                    'type': 'dropdown',
                    'active': "Use cooldown if it aligns, but don't delay usage",
                    'options': [
                        "Use cooldown if it aligns, but don't delay usage",
                        'Only use cooldown with Vendetta',
                    ]
                },
                {
                    'label': 'CP Builder',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'Mutilate',
                    'options': [
                        "Mutilate",
                        'Fan of Knives',
                    ]
                },
                {
                    'label': 'Lethal Poison',
                    'description': '',
                    'type': 'dropdown',
                    'active': "Use cooldown if it aligns, but don't delay usage",
                    'options': [
                        "Deadly Poison",
                        'Wound Poison',
                    ]
                },
            ]
        },
        {
            'spec': 'Z',
            'heading': 'Outlaw Rotation Settings',
            'items': [
                {
                    'label': 'Blade Flurry',
                    'description': 'Use Blade Flurry',
                    'type': 'checkbox',
                    'checked': False
                },
                {
                    'label': 'BtE Policy',
                    'description': '',
                    'type': 'dropdown',
                    'active': "Never use BtE",
                    'options': [
                        "Only use with Shark",
                        'Use BtE on cooldown',
                        'Never use BtE'
                    ]
                },
                {
                    'label': 'RtB Reroll Policy',
                    'description': '',
                    'type': 'dropdown',
                    'active': "Reroll single buffs",
                    'options': [
                        'Reroll single buffs',
                        'Reroll two or fewer buffs',
                        'Reroll three or fewer buffs',
                        'Custom setup per buff (see below)'
                    ]
                },
                {
                    'label': 'Jolly Roger',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'active': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'label': 'Grand Melee',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'active': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'label': 'Shark-Infested Waters',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'active': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'label': 'True Bearing',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'active': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'label': 'Buried Treasure',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'active': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'label': 'Broadsides',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'active': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                }
            ]
        },
        {
            'spec': 'b',
            'heading': 'Subtlety Rotation Settings',
            'items': [
                {
                    'label': 'CP Builder',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'Backstab',
                    'options': [
                        'Backstab',
                        'Shuriken Storm'
                    ]
                },
                {
                    'label': 'SoD Policy',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'Use on cooldown',
                    'options': [
                        'Use on cooldown',
                        'Only use SoD when needed to refresh'
                    ]
                },
                {
                    'label': 'Use Finishers during Dance',
                    'description': '',
                    'type': 'checkbox',
                    'checked': False
                },
                {
                    'label': 'Backstab uptime',
                    'description': 'Percentage of the fight you are behind the target (0-100). This has no effect if Gloomblade is selected as a talent.',
                    'type': 'textbox',
                },
                {
                    'label': 'Compute CP Waste',
                    'description': 'EXPERIMENTAL FEATURE: Compute combo point waste',
                    'type': 'checkbox',
                    'checked': False
                }
            ]
        },
        {
            'spec': 'All',
            'heading': 'Raid Buffs',
            'items': [
                {
                    'label': 'Legion Agility Flask',
                    'description': 'Flask of the Seventh Demon (1300 Agility)',
                    'type': 'checkbox',
                    'checked': False
                },
                {
                    'label': '+30% Haste/40 sec',
                    'description': 'Heroism/Bloodlust/Time Warp',
                    'type': 'checkbox',
                    'checked': False
                },
                {
                    'label': 'Food',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'The Hungry Magister (375 Crit)',
                    'options': [
                        'The Hungry Magister (375 Crit)',
                        'Azshari Salad (375 Haste)',
                        'Nightborne Delicacy Platter (375 Mastery)',
                        'Seed-Battered Fish Plate (375 Versatility)',
                        'Lavish Suramar Feast (200 Agility)',
                        'Fishbrul Special (High Fire Proc)'
                    ]
                },
                {
                    'label': 'Pre-pot',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'Potion of the Old War',
                    'options': [
                        'Potion of the Old War',
                        'Potion of Deadly Grace',
                        'None'
                    ]
                },
                {
                    'label': 'Combat Potion',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'Potion of the Old War',
                    'options': [
                        'Potion of the Old War',
                        'Potion of Deadly Grace',
                        'None'
                    ]
                }
            ]
        },
        {
            'spec': 'All',
            'heading': 'General Settings',
            'items': [
                {
                    'label': 'Enemy is Demon',
                    'description': 'Enables damage buff from heirloom trinket against demons',
                    'type': 'checkbox',
                    'checked': False
                },
                {
                    'label': 'Patch/Engine',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'Potion of the Old War',
                    'options': [
                        '7.0',
                        'fierys strange voodoo'
                    ]
                },
                {
                    'label': 'Race',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'Human',
                    'options': [
                        'Human',
                        'Dwarf',
                        'Orc',
                        'Blood Elf',
                        'Gnome',
                        'Worgen',
                        'Troll',
                        'Night Elf',
                        'Undead',
                        'Goblin',
                        'Pandaren'
                    ]
                },
                {
                    'label': 'Night Elf Racial',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'Night',
                    'options': [
                        'Night',
                        'Day'
                    ]
                },
                {
                    'label': 'Finisher Threshold',
                    'description': 'Minimum CPs to use finisher',
                    'type': 'dropdown',
                    'active': 5,
                    'options': [
                        4,
                        5,
                        6
                    ]
                },
                {
                    'label': 'Level',
                    'description': '',
                    'type': 'textbox',
                },
                {
                    'label': 'Fight Duration',
                    'description': '',
                    'type': 'textbox',
                },
                {
                    'label': 'Response Time',
                    'description': '',
                    'type': 'textbox',
                },
                {
                    'label': 'Number of Boss Adds',
                    'description': '',
                    'type': 'textbox',
                },
                {
                    'label': 'MfD Resets Per Minute',
                    'description': '',
                    'type': 'textbox',
                }
            ]
        },
        {
            'spec': 'All',
            'heading': 'Item Filter',
            'items': [
                {
                    'label': 'Dynamic ILevel filtering',
                    'description': 'Dynamically filters items in gear lists to +/- 50 Ilevels of the item equipped in that slot. Disable this option to use the manual filtering options below.',
                    'type': 'checkbox',
                    'checked': False
                },
                {
                    'label': 'Max ILevel',
                    'description': "Don't show items over this item level in gear lists",
                    'type': 'textbox',
                },
                {
                    'label': 'Min ILevel',
                    'description': "Don't show items under this item level in gear lists",
                    'type': 'textbox',
                },
                {
                    'label': 'Show Upgrades',
                    'description': 'Show all upgraded items in gear lists',
                    'type': 'dropdown',
                    'active': 'No',
                    'options': [
                        'Yes',
                        'No'
                    ]
                },
                {
                    'label': 'Recommend Epic Gems',
                    'description': '',
                    'type': 'dropdown',
                    'active': 'No',
                    'options': [
                        'Yes',
                            'No'
                    ]
                }
            ]
        },
        {
            'spec': 'All',
            'heading': 'Other',
            'items': [
                {
                    'label': 'Latency',
                    'description': '',
                    'type': 'textbox',
                },
                {
                    'label': 'Advanced Parameters',
                    'description': '',
                    'type': 'textbox',
                }
            ]
        }
    ]
    return jsonify(dummy_data)

# Websocket event for requesting a new debug SHA based on from character data.
@socketio.on('get_sha')
def history_getsha(character_data):
    return shadowcraft_ui.get_debug_sha(mongo, character_data)

# Websocket event for requesting item data by slot. Also able to filter by ilvl.
@socketio.on('get_items_by_slot')
def get_items_by_slot(slot, min_ilvl=-1, max_ilvl=-1):
    return shadowcraft_ui.get_items_by_slot(mongo, slot, min_ilvl, max_ilvl)

# TODO: we probably need other endpoints here for gems, relics, and other
# types of data. Theoretically the event above might be able to handle those
# if we add another argument. Basically I'm trying to get rid of items-rogue.js
# as much as possible. Anything that can be requested on-the-fly via a
# websocket event should be moved to one.

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')
