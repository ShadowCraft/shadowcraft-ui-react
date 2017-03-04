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
            'name': 'rotation.assassination',
            'items': [
                {
                    'name': 'kingsbane',
                    'label': 'Kingsbane w/ Vendetta',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'just',
                    'options': {
                        'just': "Use cooldown if it aligns, but don't delay usage",
                        'only': 'Only use cooldown with Vendetta'
                    }
                },
                {
                    'name': 'exsang',
                    'label': 'Exsang w/ Vendetta',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'just',
                    'options': {
                        'just': "Use cooldown if it aligns, but don't delay usage",
                        'only': 'Only use cooldown with Vendetta'
                    }
                },
                {
                    'name': 'cp_builder',
                    'label': 'CP Builder',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'mutilate',
                    'options': {
                        'mutilate': "Mutilate",
                        'fan_of_knives': 'Fan of Knives'
                    }
                },
                {
                    'name': 'lethal_poison',
                    'label': 'Lethal Poison',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'dp',
                    'options': {
                        'ap': "Deadly Poison",
                        'wp': 'Wound Poison'
                    }
                },
            ]
        },
        {
            'spec': 'Z',
            'heading': 'Outlaw Rotation Settings',
            'name': 'rotation.outlaw',
            'items': [
                {
                    'name': 'blade_flurry',
                    'label': 'Blade Flurry',
                    'description': 'Use Blade Flurry',
                    'type': 'checkbox',
                    'default': False
                },
                {
                    'name': 'between_the_eyes_policy',
                    'label': 'BtE Policy',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'never',
                    'options': {
                        "shark": "Only use with Shark",
                        "always": 'Use BtE on cooldown',
                        "never": 'Never use BtE',
                    }
                },
                {
                    'name': 'reroll_policy',
                    'label': 'RtB Reroll Policy',
                    'description': '',
                    'type': 'dropdown',
                    'default': '1',
                    'options': {
                        "1": 'Reroll single buffs',
                        "2": 'Reroll two or fewer buffs',
                        "3": 'Reroll three or fewer buffs',
                        "custom": 'Custom setup per buff (see below)',
                    }
                },
                {
                    'name': 'jolly_roger_reroll',
                    'label': 'Jolly Roger',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'default': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'name': 'grand_melee_reroll',
                    'label': 'Grand Melee',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'default': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'name': 'shark_reroll',
                    'label': 'Shark-Infested Waters',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'default': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'name': 'true_bearing_reroll',
                    'label': 'True Bearing',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'default': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'name': 'buried_treasure_reroll',
                    'label': 'Buried Treasure',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'default': 0,
                    'options': [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                {
                    'name': 'broadsides_reroll',
                    'label': 'Broadsides',
                    'description': '0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.',
                    'type': 'dropdown',
                    'default': 0,
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
            'name': 'rotation.subtlety',
            'items': [
                {
                    'name': 'cp_builder',
                    'label': 'CP Builder',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'backstab',
                    'options': {
                        'backstab': 'Backstab',
                        'shuriken_storm': 'Shuriken Storm',
                    }
                },
                {
                    'name': 'symbols_policy',
                    'label': 'SoD Policy',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'always',
                    'options': {
                        'always': 'Use on cooldown',
                        'just': 'Only use SoD when needed to refresh',
                    }
                },
                {
                    'name': 'dance_finishers_policy',
                    'label': 'Use Finishers during Dance',
                    'description': '',
                    'type': 'checkbox',
                    'default': False
                },
                {
                    'name': 'positional_uptime',
                    'label': 'Backstab uptime',
                    'description': 'Percentage of the fight you are behind the target (0-100). This has no effect if Gloomblade is selected as a talent.',
                    'type': 'textbox',
                },
                {
                    'name': 'compute_cp_waste',
                    'label': 'Compute CP Waste',
                    'description': 'EXPERIMENTAL FEATURE: Compute combo point waste',
                    'type': 'checkbox',
                    'default': False
                }
            ]
        },
        {
            'spec': 'All',
            'heading': 'Raid Buffs',
            'name': 'buffs',
            'items': [
                {
                    'name': 'flask_legion_agi',
                    'label': 'Legion Agility Flask',
                    'description': 'Flask of the Seventh Demon (1300 Agility)',
                    'type': 'checkbox',
                    'default': False
                },
                {
                    'name': 'short_term_haste_buff',
                    'label': '+30% Haste/40 sec',
                    'description': 'Heroism/Bloodlust/Time Warp',
                    'type': 'checkbox',
                    'default': False
                },
                {
                    'name': 'food_buff',
                    'label': 'Food',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'food_legion_375_crit',
                    'options': {
                        'food_legion_375_crit': 'The Hungry Magister (375 Crit)',
                        'food_legion_375_haste': 'Azshari Salad (375 Haste)',
                        'food_legion_375_mastery': 'Nightborne Delicacy Platter (375 Mastery)',
                        'food_legion_375_versatility': 'Seed-Battered Fish Plate (375 Versatility)',
                        'food_legion_feast_200': 'Lavish Suramar Feast (200 Agility)',
                        'food_legion_damage_3': 'Fishbrul Special (High Fire Proc)',
                    }
                },
                {
                    'name': 'prepot',
                    'label': 'Pre-pot',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'potion_old_war',
                    'options': {
                        'potion_old_war': 'Potion of the Old War',
                        'potion_deadly_grace': 'Potion of Deadly Grace',
                        'potion_none': 'None',
                    }
                },
                {
                    'name': 'potion',
                    'label': 'Combat Potion',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'potion_old_war',
                    'options': {
                        'potion_old_war': 'Potion of the Old War',
                        'potion_deadly_grace': 'Potion of Deadly Grace',
                        'potion_none': 'None',
                    }
                }
            ]
        },
        {
            'spec': 'All',
            'heading': 'General Settings',
            'name': 'general.settings',
            'items': [
                {
                    'name': 'demon_enemy',
                    'label': 'Enemy is Demon',
                    'description': 'Enables damage buff from heirloom trinket against demons',
                    'type': 'checkbox',
                    'default': False
                },
                {
                    'name': 'patch',
                    'label': 'Patch/Engine',
                    'description': '',
                    'type': 'dropdown',
                    'default': '7.0',
                    'options': {
                        '7.0': '7.0',
                        'fierys_strange_voodoo': 'fierys strange voodoo',
                    }
                },
                {
                    'name': 'race',
                    'label': 'Race',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'human',
                    'options': {
                        'human': 'Human',
                        'dwarf': 'Dwarf',
                        'orc': 'Orc',
                        'blood_elf': 'Blood Elf',
                        'gnome': 'Gnome',
                        'worgen': 'Worgen',
                        'troll': 'Troll',
                        'night_elf': 'Night Elf',
                        'undead': 'Undead',
                        'goblin': 'Goblin',
                        'pandren': 'Pandaren',
                    }
                },
                {
                    'name': 'night_elf_racial',
                    'label': 'Night Elf Racial',
                    'description': '',
                    'type': 'dropdown',
                    'default': 'night',
                    'options': {
                        'night': 'Night',
                        'day': 'Day',
                    }
                },
                {
                    'name': 'finisher_threshold',
                    'label': 'Finisher Threshold',
                    'description': 'Minimum CPs to use finisher',
                    'type': 'dropdown',
                    'default': 5,
                    'options': [
                        4,
                        5,
                        6
                    ]
                },
                {
                    'name': 'level',
                    'label': 'Level',
                    'description': '',
                    'type': 'textbox',
                    'default': '110'
                },
                {
                    'name': 'duration',
                    'label': 'Fight Duration',
                    'description': '',
                    'type': 'textbox',
                    'default': '360'
                },
                {
                    'name': 'response_time',
                    'label': 'Response Time',
                    'description': '',
                    'type': 'textbox',
                    'default': "0.5",
                },
                {
                    'name': 'num_boss_adds',
                    'label': 'Number of Boss Adds',
                    'description': '',
                    'type': 'textbox',
                    'default': "0",
                },
                {
                    'name': 'mfd_resets',
                    'label': 'MfD Resets Per Minute',
                    'description': '',
                    'type': 'textbox',
                    'default': "0",
                }
            ]
        },
        {
            'spec': 'All',
            'heading': 'Item Filter',
            'name': 'general.filter',
            'items': [
                {
                    'name': 'dynamic_ilvl',
                    'label': 'Dynamic ILevel filtering',
                    'description': 'Dynamically filters items in gear lists to +/- 50 Ilevels of the item equipped in that slot. Disable this option to use the manual filtering options below.',
                    'type': 'checkbox',
                    'default': False
                },
                {
                    'name': 'max_ilvl',
                    'label': 'Max ILevel',
                    'description': "Don't show items over this item level in gear lists",
                    'type': 'textbox',
                    'default': '1000'
                },
                {
                    'name': 'min_ilvl',
                    'label': 'Min ILevel',
                    'description': "Don't show items under this item level in gear lists",
                    'type': 'textbox',
                    'default': '850'
                },
                {
                    'name': 'show_upgrades',
                    'label': 'Show Upgrades',
                    'description': 'Show all upgraded items in gear lists',
                    'type': 'checkbox',
                    'default': False
                },
                {
                    'name': 'epic_gems',
                    'label': 'Recommend Epic Gems',
                    'description': '',
                    'type': 'checkbox',
                    'default': False
                }
            ]
        },
        {
            'spec': 'All',
            'heading': 'Other',
            'name': 'other',
            'items': [
                {
                    'name': 'latency',
                    'label': 'Latency',
                    'description': '',
                    'type': 'textbox',
                    'default': '0'
                },
                {
                    'name': 'advanced',
                    'label': 'Advanced Parameters',
                    'description': '',
                    'type': 'textbox',
                    'default': ''
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
