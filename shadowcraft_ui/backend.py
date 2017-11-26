"""This module serves as the interface to the shadowcraft engine"""

import traceback

from shadowcraft.calcs.rogue.Aldriana \
    import AldrianasRogueDamageCalculator, settings, settings_data, InputNotModeledException

from shadowcraft.objects import buffs
from shadowcraft.objects import race
from shadowcraft.objects import stats
from shadowcraft.objects import procs
from shadowcraft.objects import talents
from shadowcraft.objects import artifact
from shadowcraft.objects import artifact_data
from shadowcraft.core import i18n
from shadowcraft.core import exceptions


class ShadowcraftComputation:
    enchantMap = {
        5437: "mark_of_the_claw",
        5438: "mark_of_the_distant_army",
        5439: "mark_of_the_hidden_satyr",
    }

    trinkets = {

        # 6.2.3
        133597: 'infallible_tracking_charm',

        # 7.0
        140794: 'arcanogolem_digit',
        139329: 'bloodthirsty_instinct',
        137459: 'chaos_talisman',
        137419: 'chrono_shard',
        140806: 'convergence_of_fates',
        128705: 'darkmoon_deck_dominion',
        140808: 'draught_of_souls',
        140796: 'entwined_elemental_foci',
        137539: 'faulty_countermeasure',
        137369: 'giant_ornamental_pearl',
        133642: 'horn_of_valor',
        127842: 'infernal_alchemist_stone',
        137357: 'mark_of_dargrul',
        133664: 'memento_of_angerboda',
        139334: 'natures_call',
        140802: 'nightblooming_frond',
        137312: 'nightmare_egg_shell',
        139320: 'ravaged_seed_pod',
        136715: 'spiked_counterweight',
        139325: 'spontaneous_appendages',
        137373: 'tempered_egg_of_serpentrix',
        137406: 'terrorbound_nexus',
        137439: 'tiny_oozeling_in_a_jar',
        137537: 'tirathons_betrayal',
        137486: 'windscar_whetstone',
        144259: 'kiljaedens_burning_wish',

        # Return to Karazhan
        142159: 'bloodstained_handkerchief',
        142167: 'eye_of_command',
        142164: 'toe_knees_promise',

        # 7.2/Tomb of Sargeras
        144477: 'splinters_of_agronax',
        147009: 'infernal_cinders',
        147010: 'cradle_of_anguish',
        147011: 'vial_of_ceaseless_toxins',
        147012: 'umbral_moonglaives',
        147015: 'engine_of_eradication',
        151190: 'specter_of_betrayal',

        # Seat of the Triumvirate
        151307: 'void_stalkers_contract',

        # Antorus, The Burning Throne
        154172: 'amanthuls_vision',
        154174: 'golganneths_vitality',
        151969: 'terminus_signaling_beacon',
        151963: 'forgefiends_fabricator',
        151964: 'seeping_scourgewing',
        152093: 'gorshalachs_legacy',
        151968: 'shadowsinged_fang',
    }

    otherProcs = {
    }

    artifactTraits = {
        # Assassination/Kingslayers
        'a': {
            214368: 'assassins_blades',
            192657: 'bag_of_tricks',
            192326: 'balanced_blades',
            192923: 'blood_of_the_assassinated',
            192323: 'fade_into_shadows',
            192428: 'from_the_shadows',
            192759: 'kingsbane',
            192329: 'gushing_wounds',
            192318: 'master_alchemist',
            192349: 'master_assassin',
            192376: 'poison_knives',
            192315: 'serrated_edge',
            192422: 'shadow_swiftness',
            192345: 'shadow_walker',
            192424: 'surge_of_toxins',
            192310: 'toxic_blades',
            192384: 'urge_to_kill',
            214928: 'slayers_precision',
            241152: 'silence_of_the_uncrowned',
            238066: 'strangler',
            238102: 'dense_concoction',
            238138: 'sinister_circulation',
            239042: 'concordance_of_the_legionfall',
        },

        # Outlaw/Dreadblades traits
        'Z': {
            216230: 'black_powder',
            202507: 'blade_dancer',
            202628: 'blademaster',
            202897: 'blunderbuss',
            202769: 'blurred_time',
            202665: 'curse_of_the_dreadblades',
            202463: 'cursed_edges',
            202521: 'cursed_leather',
            202755: 'deception',
            202524: 'fatebringer',
            202514: 'fates_thirst',
            202907: 'fortunes_boon',
            202530: 'fortune_strikes',
            202533: 'ghostly_shell',
            202820: 'greed',
            202522: 'gunslinger',
            202753: 'hidden_blade',
            214929: 'cursed_steel',
            241153: 'bravado_of_the_uncrowned',
            238067: 'sabermetrics',
            238103: 'dreadblades_vigor',
            238139: 'loaded_dice',
            239042: 'concordance_of_the_legionfall',
        },

        # Subtlety/Fangs traits
        'b': {
            209835: 'akarris_soul',
            197241: 'catlike_reflexes',
            197233: 'demons_kiss',
            197604: 'embrace_of_darkness',
            197239: 'energetic_stabbing',
            197256: 'flickering_shadows',
            197406: 'finality',
            197369: 'fortunes_bite',
            197244: 'ghost_armor',
            209782: 'goremaws_bite',
            197234: 'gutripper',
            197235: 'precision_strike',
            197231: 'the_quiet_knife',
            197610: 'second_shuriken',
            221856: 'shadow_fangs',
            209781: 'shadow_nova',
            197386: 'soul_shadows',
            214930: 'legionblade',
            241154: 'shadows_of_the_uncrowned',
            238068: 'etched_in_shadow',
            242707: 'shadows_whisper',
            238140: 'feeding_frenzy',
            239042: 'concordance_of_the_legionfall',
        },

        # Netherlight Crucible traits
        'netherlight': {
            252901: 'master_of_shadows',
            252191: 'murderous_intent',
            252875: 'shadowbind',
            252888: 'chaotic_darkness',
            252906: 'torment_the_weak',
            252922: 'dark_sorrows',
            252088: 'light_speed',
            252207: 'refractive_shell',
            252799: 'shocklight',
            253070: 'secure_in_the_light',
            253093: 'infusion_of_light',
            253111: 'lights_embrace'
        }
    }

    artifactTraitsReverse = {}
    for k, v in artifactTraits.items():
        artifactTraitsReverse[k] = {v2: k2 for k2, v2 in v.items()}

    gearProcs = trinkets.copy()
    gearProcs.update(otherProcs)

    # This is the maximum ilvl + 5, because python range method doesn't include
    # the max value passed in as one of the steps.
    RANGE_MAX = 990

    # used for rankings
    trinketGroups = {
        # Alchemist trinket
        'infernal_alchemist_stone': range(815, 885, 5),

        # Dungeon trinkets
        'chaos_talisman': range(820, RANGE_MAX, 5),
        'chrono_shard': range(820, RANGE_MAX, 5),
        'darkmoon_deck_dominion': range(815, RANGE_MAX, 5),
        'faulty_countermeasure': range(820, RANGE_MAX, 5),
        'giant_ornamental_pearl': range(820, RANGE_MAX, 5),
        'horn_of_valor': range(820, RANGE_MAX, 5),
        'mark_of_dargrul': range(820, RANGE_MAX, 5),
        'memento_of_angerboda': range(820, RANGE_MAX, 5),
        'nightmare_egg_shell': range(820, RANGE_MAX, 5),
        'spiked_counterweight': range(820, RANGE_MAX, 5),
        'tempered_egg_of_serpentrix': range(820, RANGE_MAX, 5),
        'terrorbound_nexus': range(820, RANGE_MAX, 5),
        'tiny_oozeling_in_a_jar': range(820, RANGE_MAX, 5),
        'tirathons_betrayal': range(820, RANGE_MAX, 5),
        'windscar_whetstone': range(820, RANGE_MAX, 5),

        # Emerald Nightmare
        'ravaged_seed_pod': range(850, RANGE_MAX, 5),
        'spontaneous_appendages': range(850, RANGE_MAX, 5),
        'natures_call': range(850, RANGE_MAX, 5),
        'bloodthirsty_instinct': range(850, RANGE_MAX, 5),

        # Return to Karazhan
        'bloodstained_handkerchief': range(855, RANGE_MAX, 5),
        'eye_of_command': range(860, RANGE_MAX, 5),
        'toe_knees_promise': range(855, RANGE_MAX, 5),

        # Nighthold trinkets
        'arcanogolem_digit': range(855, RANGE_MAX, 5),
        'convergence_of_fates': range(860, RANGE_MAX, 5),
        'entwined_elemental_foci': range(860, RANGE_MAX, 5),
        'nightblooming_frond': range(860, RANGE_MAX, 5),
        'draught_of_souls': range(865, RANGE_MAX, 5),

        # Legendary trinkets
        'kiljaedens_burning_wish': [910, 940, 970, 1000],

        # 7.2/Tomb of Sargeras
        'splinters_of_agronax': range(845, RANGE_MAX, 5),
        'infernal_cinders': range(885, RANGE_MAX, 5),
        'cradle_of_anguish': range(885, RANGE_MAX, 5),
        'vial_of_ceaseless_toxins': range(885, RANGE_MAX, 5),
        'umbral_moonglaives': range(885, RANGE_MAX, 5),
        'engine_of_eradication': range(885, RANGE_MAX, 5),
        'specter_of_betrayal': range(895, RANGE_MAX, 5),

        # Seat of the Triumvirate
        'void_stalkers_contract': range(865, RANGE_MAX, 5),

        # Antorus, The Burning Throne
        'amanthuls_vision': range(915, RANGE_MAX, 5),
        'golganneths_vitality': range(915, RANGE_MAX, 5),
        'terminus_signaling_beacon': range(915, RANGE_MAX, 5),
        'forgefiends_fabricator': range(915, RANGE_MAX, 5),
        'seeping_scourgewing': range(915, RANGE_MAX, 5),
        'gorshalachs_legacy': range(915, RANGE_MAX, 5),
        'shadowsinged_fang': range(915, RANGE_MAX, 5),
    }

    gearBoosts = {
        137049: 'insignia_of_ravenholdt',
        137030: 'duskwalkers_footpads',
        137098: 'zoldyck_family_training_shackles',
        137021: 'the_dreadlords_deceit',
        137031: 'thraxis_tricksy_treads',
        137099: 'greenskins_waterlogged_wristcuffs',
        141321: 'shivarran_symmetry',
        137032: 'shadow_satyrs_walk',
        137100: 'denial_of_the_half_giants',
        133976: 'cinidaria_the_symbiote',
        144236: 'mantle_of_the_master_assassin',
        132452: 'sephuzs_secret',
        134542: 'jeweled_signet_of_melandrus',
        134526: 'gnawed_thumb_ring',
        150936: 'soul_of_the_shadowblade',
        151817: 'the_curse_of_restlessness',
        151815: 'the_empty_crown',
        151818: 'the_first_of_the_dead',
        152626: 'insignia_of_the_grand_army',
    }

    # combines gearProcs and gearBoosts
    trinketMap = {**gearProcs, **gearBoosts}

    # Tier + Order Hall sets
    tier19IDs = frozenset([138326, 138329, 138332, 138335, 138338, 138371])
    tier20IDs = frozenset([147169, 147170, 147171, 147172, 147173, 147174])
    orderhallIDs = frozenset(
        [139739, 139740, 139741, 139742, 139743, 139744, 139745, 139746])

    # Legion Dungeon sets
    marchOfTheLegionIDs = frozenset([134529, 134533])
    journeyThroughTimeIDs = frozenset([137419, 137487])
    jacinsRuseIDs = frozenset([137480, 137397])

    # Kara trinket/chest sets
    toeKneesIDs = frozenset([142164, 142203])
    bloodstainedIDs = frozenset([142159, 142203])
    eyeOfCommandIDs = frozenset([142167, 142203])

    def weapon(self, gear_data, slot):
        if slot not in gear_data or gear_data[slot] is None or len(gear_data[slot]) == 0:
            return stats.Weapon(0.01, 2, None, None)

        speed = float(gear_data[slot]['weaponStats']['speed'])
        dmg = float(gear_data[slot]['weaponStats']['dps']) * speed
        return stats.Weapon(dmg, speed, None, None)

    def setup(self, input_data, gear_data, gear_stats, gear_ids):

        i18n.set_language('local')

        # Base
        _level = int(input_data['character'].get("level", 110))

        # Buffs
        buff_list = []
        if input_data['settings'].get('flask_legion_agi', False):
            buff_list.append('flask_wod_agi')
        if input_data['settings'].get('short_term_haste_buff', False):
            buff_list.append('short_term_haste_buff')
        buff_list.append(input_data['settings']['food_buff'])

        _buffs = buffs.Buffs(*buff_list, level=_level)

        # ##################################################################################
        # Set up gear buffs.
        buff_list = ['gear_specialization']

        if len(self.tier19IDs & gear_ids) >= 2:
            buff_list.append('rogue_t19_2pc')

        if len(self.tier19IDs & gear_ids) >= 4:
            buff_list.append('rogue_t19_4pc')

        if len(self.tier20IDs & gear_ids) >= 2:
            buff_list.append('rogue_t20_2pc')

        if len(self.tier20IDs & gear_ids) >= 4:
            buff_list.append('rogue_t20_4pc')

        if len(self.orderhallIDs & gear_ids) >= 6:
            buff_list.append('rogue_orderhall_6pc')

        if len(self.orderhallIDs & gear_ids) == 8:
            buff_list.append('rogue_orderhall_8pc')

        if len(self.marchOfTheLegionIDs & gear_ids) == 2:
            buff_list.append('march_of_the_legion_2pc')

        if len(self.journeyThroughTimeIDs & gear_ids) == 2:
            buff_list.append('journey_through_time_2pc')

        if len(self.jacinsRuseIDs & gear_ids) == 2:
            buff_list.append('jacins_ruse_2pc')

        if len(self.toeKneesIDs & gear_ids) == 2 \
                or len(self.bloodstainedIDs & gear_ids) == 2 \
                or len(self.eyeOfCommandIDs & gear_ids) == 2:
            buff_list.append('kara_empowered_2pc')

        for item_id, item_name in self.gearBoosts.items():
            if item_id in gear_ids:
                buff_list.append(item_name)

        _gear_buffs = stats.GearBuffs(*buff_list)

        # ##################################################################################
        # Trinket procs and enchants
        proclist = []
        for slot, item in gear_data.items():
            item_id = item['id']
            if item_id in self.gearProcs:
                proclist.append((self.gearProcs[item_id], item['item_level']))
                if item_id == 133597:
                    proclist.append(('infallible_tracking_charm_mod', gd[1]))

            # If the item has an enchant and it's proc-based, add it to the proc list
            enchant = item['enchant']
            if enchant != 0 and enchant in self.enchantMap:
                proclist.append(self.enchantMap[enchant])

        pot = input_data['settings'].get('potion', 'potion_none')
        if pot != 'potion_none':
            proclist.append(pot)

        prepot = input_data['settings'].get('prepot', 'potion_none')
        if prepot != 'potion_none':
            proclist.append(prepot)

        # TODO: this doesn't like our new settings for potions
        _procs = procs.ProcsList(*proclist)

        # ##################################################################################
        # Weapons
        _mh = self.weapon(gear_data, 'mainHand')
        _oh = self.weapon(gear_data, 'offHand')
        # ##################################################################################

        # ##################################################################################
        # Player stats
        # Need parameter order here
        # str, agi, int, spi, sta, ap, crit, hit, exp, haste, mastery, mh, oh,
        # thrown, procs, gear buffs
        racestr = input_data['settings'].get("race", 'human').lower().replace(" ", "_")
        _class = input_data['character'].get('player_class', 'rogue')
        _race = race.Race(racestr, _class, _level)

        _stats = stats.Stats(
            mh=_mh, oh=_oh, procs=_procs, gear_buffs=_gear_buffs,
            str=gear_stats.get('strength', 0),
            agi=gear_stats.get('agility', 0),
            int=gear_stats.get('intellect', 0),
            stam=gear_stats.get('stamina', 0),
            ap=0,
            crit=gear_stats.get('crit', 0),
            haste=gear_stats.get('haste', 0),
            mastery=gear_stats.get('mastery', 0),
            versatility=gear_stats.get('versatility', 0),
            level=_level)

        # ##################################################################################

        _spec = input_data['character'].get("active", 'a')
        if _spec == "a":
            spec = "assassination"
            cycle = settings.AssassinationCycle(**input_data['settings'])
        elif _spec == "Z":
            spec = "outlaw"
            cycle = settings.OutlawCycle(**input_data['settings'])
        else:
            spec = "subtlety"
            cycle = settings.SubtletyCycle(**input_data['settings'])

        # Talents
        t = input_data['character']['talents']['current']
        _talents = talents.Talents(t, spec, _class, _level)
        _settings = settings.Settings(cycle, **input_data['settings'])
        _artifact = input_data['character']['artifact']

        tier2_traits = {}
        tier3_traits = {}
        for slot in _artifact['netherlight']:
            if slot['tier2'] in tier2_traits:
                tier2_traits[slot['tier2']] += 1
            else:
                tier2_traits[slot['tier2']] = 1
            if slot['tier3'] in tier3_traits:
                tier3_traits[slot['tier3']] += 1
            else:
                tier3_traits[slot['tier3']] = 1

        trait_values = {}
        for k, v in self.artifactTraits[_spec].items():
            if str(k) in _artifact['traits']:
                trait_values[v] = _artifact['traits'][str(k)]
            if k in tier3_traits:
                trait_values[v] += tier3_traits[k]

        for k, v in self.artifactTraits['netherlight'].items():
            if k in tier2_traits:
                trait_values[v] = tier2_traits[k]

        _traits = artifact.Artifact(spec, "rogue", trait_dict=trait_values)
        calculator = AldrianasRogueDamageCalculator(
            _stats, _talents, _traits, _buffs, _race, spec, _settings, _level)
        return calculator

    def get_all(self, db, input_data):
        out = {}
        try:

            # We do this here instead of in the setup method because the gear data is needed
            # in this method too, so just do it and pass it into setup to avoid doing it
            # twice.
            gear_data = input_data['character'].get("gear", {})
            gear_ids = []
            gear_stats = {}
            for slot, item in gear_data.items():
                gear_ids.append(item['id'])

                # Calculate overall stats as we go
                for stat, value in item['stats'].items():
                    if stat not in gear_stats:
                        gear_stats[stat] = 0
                    gear_stats[stat] += value

                if item['enchant'] != 0:
                    # Look up this enchant from the database to determine whether it has a stat
                    # component to it.
                    results = db.enchants.find({'spell_id': item['enchant']})
                    if results.count() != 0:
                        for stat, value in results[0]['stats'].items():
                            if stat not in gear_stats:
                                gear_stats[stat] = 0
                            gear_stats[stat] += value

                for gem in item['gems']:
                    if gem != 0:
                        # Look up this gem from the database and add the stat
                        results = db.items.find({'id': gem['id']})
                        if results.count() != 0:
                            for stat, value in results[0]['stats'].items():
                                if stat not in gear_stats:
                                    gear_stats[stat] = 0
                                gear_stats[stat] += value

            # Turn this into a frozenset so it can be compared against other
            # frozensets
            gear_ids = frozenset(gear_ids)

            calculator = self.setup(
                input_data, gear_data, gear_stats, gear_ids)

            # Compute DPS Breakdown.
            out["breakdown"] = calculator.get_dps_breakdown()
            out["totalDps"] = sum(entry[1]
                                  for entry in out["breakdown"].items())

            # Get character stats used for calculation (should equal armory)
            out["stats"] = calculator.stats.get_character_stats(
                calculator.race, calculator.traits)
            # Filter interesting stats
            out["stats"]["agility"] = out["stats"]["agi"]
            out['stats'] = {k: out['stats'][k] for k in [
                'agility', 'crit', 'versatility', 'mastery', 'haste']}

            # Get EP Values
            default_ep_stats = ['agi', 'haste',
                                'crit', 'mastery', 'versatility', 'ap']
            out["ep"] = calculator.get_ep(ep_stats=default_ep_stats)

            other_buffs = ['rogue_t19_2pc', 'rogue_t19_4pc', 'rogue_orderhall_8pc',
                           'rogue_t20_2pc', 'rogue_t20_4pc',
                           'mark_of_the_hidden_satyr', 'mark_of_the_distant_army',
                           'mark_of_the_claw', 'march_of_the_legion_2pc',
                           'journey_through_time_2pc', 'jacins_ruse_2pc',
                           'kara_empowered_2pc']

            for k, v in self.gearBoosts.items():
                other_buffs.append(v)

            out["other_ep"] = calculator.get_other_ep(other_buffs)

            gear_rankings = calculator.get_upgrades_ep_fast(self.trinketGroups)
            out["proc_ep"] = gear_rankings
            out["trinket_map"] = self.trinketMap

            # Compute weapon ep
            out["mh_ep"], out["oh_ep"] = calculator.get_weapon_ep(
                dps=True, enchants=True)
            out["mh_speed_ep"], out["oh_speed_ep"] = calculator.get_weapon_ep(
                [2.4, 2.6, 1.7, 1.8])
            _spec = input_data['character'].get("active", "a")
            if _spec == "Z":
                out["mh_type_ep"], out[
                    "oh_type_ep"] = calculator.get_weapon_type_ep()

            # Talent ranking is slow. This is done last per a note from
            # nextormento.
            talent_ranks = calculator.get_talents_ranking()
            out['talentRanking'] = {}
            for tier, values in talent_ranks.items():
                out['talentRanking'].update(values)

            out["engine_info"] = calculator.get_engine_info()

            # Get the artifact ranking and change the IDs from the engine back to
            # the item IDs using the artifactMap data.
            artifact_ranks = calculator.get_trait_ranking()
            out["traitRanking"] = {}
            for trait, spell_id in self.artifactTraitsReverse[_spec].items():
                if trait in artifact_ranks:
                    out['traitRanking'][spell_id] = round(artifact_ranks[trait], 2)
                else:
                    out['traitRanking'][spell_id] = 0

            for trait, spell_id in self.artifactTraitsReverse['netherlight'].items():
                if trait in artifact_ranks:
                    out['traitRanking'][spell_id] = round(artifact_ranks[trait], 2)
                else:
                    out['traitRanking'][spell_id] = 0

            return out
        except (InputNotModeledException, exceptions.InvalidInputException) as exc:
            out["error"] = exc.error_msg
            return out


def get_engine_output(db, input_data):
    engine = ShadowcraftComputation()
    try:
        response = engine.get_all(db, input_data)
    except KeyError as exc:
        traceback.print_exc()
        response = {'error': "%s: %s" % (exc.__class__, exc.args[0])}
    return response


def get_settings():
    filters = {
        'spec': 'All',
        'heading': 'Item Filter',
        'name': 'general.filter',
        'items': [
            {
                'name': 'dynamic_ilvl',
                'label': 'Dynamic ILevel filtering',
                'description': 'Dynamically filters items in gear lists to \
                                +/- 50 Ilevels of the item equipped in that slot. \
                                Disable this option to use the manual filtering options below.',
                'type': 'checkbox',
                'default': False
            },
            {
                'name': 'max_ilvl',
                'label': 'Max ILevel',
                'description': "Don't show items over this item level in gear lists",
                'type': 'text',
                'default': '1000'
            },
            {
                'name': 'min_ilvl',
                'label': 'Min ILevel',
                'description': "Don't show items under this item level in gear lists",
                'type': 'text',
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
    }
    data = list(settings_data.rogue_settings) #copies rogue_settings, so we don't append to that
    data.append(filters)
    return data


if __name__ == '__main__':
    print(get_engine_output({}))
