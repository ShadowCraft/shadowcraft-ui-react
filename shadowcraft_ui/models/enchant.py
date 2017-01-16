import pymongo

def init_db(db):
    db.enchants.create_index([('spell_id', pymongo.ASCENDING)], unique=True)

def populate_db(db):
    enchants = [
        # Cloak
        {'spell_id': 5432,
         'stats': {'agility': 150},
         'icon': 'inv_enchant_formulagood_01',
         'item_name': 'Enchant Cloak - Word of Agility',
         'equip_location': 16,
         'tooltip_spell': 128546
        },
        {'spell_id': 5435,
         'stats': {'agility': 200},
         'icon': 'inv_enchant_formulasuperior_01',
         'item_name': 'Enchant Cloak - Binding of Agility',
         'equip_location': 16,
         'tooltip_spell': 128549
        },

        # Ring
        {'spell_id': 5423,
         'stats': {'crit': 150},
         'icon': 'inv_enchant_formulagood_01',
         'item_name': 'Enchant Ring - Word of Critical Strike',
         'equip_location': 11,
         'tooltip_spell': 128537
        },
        {'spell_id': 5424,
         'stats': {'haste': 150},
         'icon': 'inv_enchant_formulagood_01',
         'item_name': 'Enchant Ring - Word of Haste',
         'equip_location': 11,
         'tooltip_spell': 128538,
        },
        {'spell_id': 5425,
         'stats': {'mastery': 150},
         'icon': 'inv_enchant_formulagood_01',
         'item_name': 'Enchant Ring - Word of Mastery',
         'equip_location': 11,
         'tooltip_spell': 128539,
        },
        {'spell_id': 5426,
         'stats': {'versatility': 150},
         'icon': 'inv_enchant_formulagood_01',
         'item_name': 'Enchant Ring - Word of Versatility',
         'equip_location': 11,
         'tooltip_spell': 128540,
        },
        {'spell_id': 5427,
         'stats': {'crit': 200},
         'icon': 'inv_enchant_formulasuperior_01',
         'item_name': 'Enchant Ring - Binding of Critical Strike',
         'equip_location': 11,
         'tooltip_spell': 128541,
        },
        {'spell_id': 5428,
         'stats': {'haste': 200},
         'icon': 'inv_enchant_formulasuperior_01',
         'item_name': 'Enchant Ring - Binding of Haste',
         'equip_location': 11,
         'tooltip_spell': 128542,
        },
        {'spell_id': 5429,
         'stats': {'mastery': 200},
         'icon': 'inv_enchant_formulasuperior_01',
         'item_name': 'Enchant Ring - Binding of Mastery',
         'equip_location': 11,
         'tooltip_spell': 128543,
        },
        {'spell_id': 5430,
         'stats': {'versatility': 200},
         'icon': 'inv_enchant_formulasuperior_01',
         'item_name': 'Enchant Ring - Binding of Versatility',
         'equip_location': 128544,
        },

        # Neck
        {'spell_id': 5437,
         'stats': {},
         'icon': 'inv_enchant_formulasuperior_01',
         'item_name': 'Enchant Neck - Mark of the Claw',
         'equip_location': 2,
         'tooltip_spell': 128551,
         'is_proc': True
        },
        {'spell_id': 5438,
         'stats': {},
         'icon': 'inv_enchant_formulasuperior_01',
         'item_name': 'Enchant Neck - Mark of the Distant Army',
         'equip_location': 2,
         'tooltip_spell': 128552,
         'is_proc': True
        },
        {'spell_id': 5439,
         'stats': {},
         'icon': 'inv_enchant_formulasuperior_01',
         'item_name': 'Enchant Neck - Mark of the Hidden Satyr',
         'equip_location': 2,
         'tooltip_spell': 128553,
         'is_proc': True
        },
        {'spell_id': 5890,
         'stats': {'mastery': 300},
         'icon': 'inv_enchant_formulasuperior_01',
         'item_name': 'Enchant Neck - Mark of the Trained Soldier',
         'equip_location': 2,
         'tooltip_spell': 141909,
         'is_proc': False
        }
    ]

    for enchant in enchants:
        db.enchants.replace_one({'spell_id': enchant['spell_id']},
                                enchant, upsert=True)

def test_enchants():
    mongo = pymongo.MongoClient()
    populate_db(mongo.roguesim_python)
    
if __name__ == '__main__':
    test_enchants()
