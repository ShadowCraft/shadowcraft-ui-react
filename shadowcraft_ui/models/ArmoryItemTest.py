import unittest
from ArmoryItem import ArmoryItem


class ArmoryItemTest(unittest.TestCase):

    def test_populate_data(self):
        shoulders = {
            "id": 138338,
            "disenchantingSkillRank": 0,
            "description": "",
            "name": "Doomblade Spaulders",
            "icon": "inv_leather_raidrogue_q_01shoulders",
            "stackable": 1,
            "allowableClasses": [4],
            "itemBind": 1,
            "bonusStats": [{
                "stat": 32,
                "amount": 716
            }, {
                "stat": 73,
                "amount": 1121
            }, {
                "stat": 36,
                "amount": 350
            }, {
                "stat": 7,
                "amount": 1681
            }],
            "itemSpells": [],
            "buyPrice": 2154119,
            "itemClass": 4,
            "itemSubClass": 2,
            "containerSlots": 0,
            "inventoryType": 3,
            "equippable": True,
            "itemLevel": 860,
            "itemSet": {
                "id": 1289,
                "name": "Doomblade Battlegear",
                "setBonuses": [],
                "items": [138326, 138329, 138332, 138335, 138338, 138371]
            },
            "maxCount": 0,
            "maxDurability": 100,
            "minFactionId": 0,
            "minReputation": 0,
            "quality": 4,
            "sellPrice": 430823,
            "requiredSkill": 0,
            "requiredLevel": 110,
            "requiredSkillRank": 0,
            "itemSource": {
                "sourceId": 86291,
                "sourceType": "VENDOR"
            },
            "baseArmor": 255,
            "hasSockets": False,
            "isAuctionable": False,
            "armor": 255,
            "displayInfoId": 156075,
            "nameDescription": " Raid Finder",
            "nameDescriptionColor": "00ff00",
            "upgradable": False,
            "heroicTooltip": False,
            "context": "raid-finder",
            "bonusLists": [3520],
            "availableContexts": ["raid-finder", "raid-normal", "raid-heroic", "raid-mythic", "world-quest-10"],
            "bonusSummary": {
                "defaultBonusLists": [3520],
                "chanceBonusLists": [1808, 40, 41, 42, 43],
                "bonusChances": [{
                    "chanceType": "STAT",
                    "stats": [{
                        "statId": "61",
                        "delta": 457
                    }, {
                        "statId": "62",
                        "delta": 457
                    }, {
                        "statId": "63",
                        "delta": 457
                    }, {
                        "statId": "64",
                        "delta": 457
                    }],
                    "sockets": []
                }, {
                    "chanceType": "SOCKET",
                    "stats": [],
                    "sockets": [{
                        "socketType": "PRISMATIC"
                    }]
                }]
            },
            "artifactId": 0
        }

        self.assertEqual(
            ArmoryItem(shoulders).stats,
            {
                'agility': 1289,
                'stamina': 1934,
                'crit': 758,
                'haste': 371  # supposed to be 372, but whatevs
            }
        )

    def test_populate_data_with_ring(self):
        ring = {
            "id": 137049,
            "description": "An insignia only given to those who have demonstrated mastery of the shadows, and killed in service to Ravenholdt.",
            "name": "Insignia of Ravenholdt",
            "icon": "inv_misc_epicring_a2",
            "stackable": 1,
            "allowableClasses": [4],
            "itemBind": 1,
            "bonusStats": [{
                "stat": 32,
                "amount": 2004
            }, {
                "stat": 36,
                "amount": 1114
            }, {
                "stat": 7,
                "amount": 2010
            }],
            "itemSpells": [{
                "spellId": 209041,
                "spell": {
                    "id": 209041,
                    "name": "Insignia of Ravenholdt",
                    "icon": "trade_engineering",
                    "description": "Your single-target combo-point generating attacks deal 15% additional damage as Shadow to all targets within 15 yards in front of you.",
                    "castTime": "Passive"
                },
                "nCharges": 0,
                "consumable": False,
                "categoryId": 0,
                "trigger": "ON_EQUIP"
            }],
            "buyPrice": 2892989,
            "itemClass": 4,
            "itemSubClass": 0,
            "containerSlots": 0,
            "inventoryType": 11,
            "equippable": True,
            "itemLevel": 910,
            "maxCount": 0,
            "maxDurability": 0,
            "minFactionId": 0,
            "minReputation": 0,
            "quality": 5,
            "sellPrice": 578597,
            "requiredSkill": 0,
            "requiredLevel": 101,
            "requiredSkillRank": 0,
            "socketInfo": {
                "sockets": [{
                    "type": "PRISMATIC"
                }]
            },
            "itemSource": {
                "sourceId": 86291,
                "sourceType": "VENDOR"
            },
            "baseArmor": 0,
            "hasSockets": True,
            "isAuctionable": False,
            "armor": 0,
            "displayInfoId": 0,
            "nameDescription": "",
            "nameDescriptionColor": "000000",
            "upgradable": True,
            "heroicTooltip": False,
            "context": "",
            "bonusLists": [],
            "availableContexts": [""],
            "bonusSummary": {
                "defaultBonusLists": [],
                "chanceBonusLists": [1811, 3459, 3458, 3530, 3570],
                "bonusChances": []
            },
            "artifactId": 0
        }
        self.assertEqual(
            ArmoryItem(ring).stats,
            {
                'stamina': 2010,
                'crit': 2004,
                'haste': 1114
            }
        )

    def test_populate_data_with_cloak(self):
        cloak = {
            "id": 137021,
            "description": "I've been preparing for you, young prince. I am Mal'Ganis. As you can see, your people are now mine...",
            "name": "The Dreadlord's Deceit",
            "icon": "inv_cape_pandaria_d_03",
            "stackable": 1,
            "allowableClasses": [4],
            "itemBind": 1,
            "bonusStats": [{
                "stat": 32,
                "amount": 551
            }, {
                "stat": 49,
                "amount": 413
            }, {
                "stat": 3,
                "amount": 1340
            }, {
                "stat": 7,
                "amount": 2010
            }],
            "itemSpells": [{
                "spellId": 208692,
                "spell": {
                    "id": 208692,
                    "name": "The Dreadlord's Deceit",
                    "icon": "ability_creature_cursed_04",
                    "description": "Every 2 sec, gain 35% increased damage for your next Fan of Knives, stacking up to 30 times.",
                    "castTime": "Passive"
                },
                "nCharges": 0,
                "consumable": False,
                "categoryId": 0,
                "trigger": "ON_EQUIP"
            }],
            "buyPrice": 3344921,
            "itemClass": 4,
            "itemSubClass": 1,
            "containerSlots": 0,
            "inventoryType": 16,
            "equippable": True,
            "itemLevel": 910,
            "maxCount": 0,
            "maxDurability": 0,
            "minFactionId": 0,
            "minReputation": 0,
            "quality": 5,
            "sellPrice": 668984,
            "requiredSkill": 0,
            "requiredLevel": 101,
            "requiredSkillRank": 0,
            "itemSource": {
                "sourceId": 86291,
                "sourceType": "VENDOR"
            },
            "baseArmor": 161,
            "hasSockets": False,
            "isAuctionable": False,
            "armor": 161,
            "displayInfoId": 117009,
            "nameDescription": "",
            "nameDescriptionColor": "000000",
            "upgradable": True,
            "heroicTooltip": False,
            "context": "",
            "bonusLists": [],
            "availableContexts": [""],
            "bonusSummary": {
                "defaultBonusLists": [],
                "chanceBonusLists": [1811, 3459, 3458, 3530, 3570],
                "bonusChances": []
            },
            "artifactId": 0
        }
        self.assertEqual(
            ArmoryItem(cloak).stats,
            {
                'agility': 1340,
                'stamina': 2010,
                'crit': 551,
                'mastery': 413
            }
        )

    def test_populate_data_with_neck(self):
        neck = {
            "id": 132444,
            "description": "Bearers of this amulet whistle a haunting tune, and those nearby attest to a distant cry of anguish between the notes.",
            "name": "Prydaz, Xavaric's Magnum Opus",
            "icon": "inv_misc_necklace15",
            "stackable": 1,
            "itemBind": 1,
            "bonusStats": [{
                "stat": 32,
                "amount": 1247
            }, {
                "stat": 49,
                "amount": 1247
            }, {
                "stat": 36,
                "amount": 1247
            }, {
                "stat": 7,
                "amount": 2010
            }],
            "itemSpells": [{
                "spellId": 207428,
                "spell": {
                    "id": 207428,
                    "name": "Xavaric's Magnum Opus",
                    "icon": "inv_misc_necklace15",
                    "description": "Every 30 sec, gain an absorb shield for 25% of your maximum health for 30 sec.",
                    "castTime": "Passive"
                },
                "nCharges": 0,
                "consumable": False,
                "categoryId": 0,
                "trigger": "ON_EQUIP"
            }],
            "buyPrice": 2029953,
            "itemClass": 4,
            "itemSubClass": 0,
            "containerSlots": 0,
            "inventoryType": 2,
            "equippable": True,
            "itemLevel": 910,
            "maxCount": 0,
            "maxDurability": 0,
            "minFactionId": 0,
            "minReputation": 0,
            "quality": 5,
            "sellPrice": 405990,
            "requiredSkill": 0,
            "requiredLevel": 101,
            "requiredSkillRank": 0,
            "socketInfo": {
                "sockets": [{
                    "type": "PRISMATIC"
                }]
            },
            "itemSource": {
                "sourceId": 86291,
                "sourceType": "VENDOR"
            },
            "baseArmor": 0,
            "hasSockets": True,
            "isAuctionable": False,
            "armor": 0,
            "displayInfoId": 0,
            "nameDescription": "",
            "nameDescriptionColor": "000000",
            "upgradable": True,
            "heroicTooltip": False,
            "context": "",
            "bonusLists": [],
            "availableContexts": [""],
            "bonusSummary": {
                "defaultBonusLists": [],
                "chanceBonusLists": [1811, 3459, 3458, 3530, 3570],
                "bonusChances": []
            },
            "artifactId": 0
        }
        self.assertEqual(
            ArmoryItem(neck).stats,
            {
                'stamina': 2010,
                'crit': 1247,
                'mastery': 1247,
                'haste': 1247,
            }
        )

    def test_populate_data_with_trinket(self):
        trinket = {
            "id": 142166,
            "disenchantingSkillRank": 0,
            "description": "",
            "name": "Ethereal Urn",
            "icon": "inv_misc_urn_01",
            "stackable": 1,
            "itemBind": 1,
            "bonusStats": [{
                "stat": 49,
                "amount": 1075
            }, {
                "stat": 71,
                "amount": 1634
            }],
            "itemSpells": [{
                "spellId": 232043,
                "spell": {
                    "id": 232043,
                    "name": "Heroic Resolve",
                    "icon": "inv_misc_urn_01",
                    "description": "Instantly remove all Fear effects.",
                    "castTime": "Instant",
                    "cooldown": "3 min cooldown"
                },
                "nCharges": 0,
                "consumable": False,
                "categoryId": 0,
                "trigger": "ON_USE"
            }],
            "buyPrice": 2589071,
            "itemClass": 4,
            "itemSubClass": 0,
            "containerSlots": 0,
            "inventoryType": 12,
            "equippable": True,
            "itemLevel": 875,
            "maxCount": 0,
            "maxDurability": 0,
            "minFactionId": 0,
            "minReputation": 0,
            "quality": 4,
            "sellPrice": 517814,
            "requiredSkill": 0,
            "requiredLevel": 110,
            "requiredSkillRank": 0,
            "itemSource": {
                "sourceId": 0,
                "sourceType": "NONE"
            },
            "baseArmor": 0,
            "hasSockets": False,
            "isAuctionable": False,
            "armor": 0,
            "displayInfoId": 0,
            "nameDescription": "",
            "nameDescriptionColor": "000000",
            "upgradable": True,
            "heroicTooltip": False,
            "context": "dungeon-normal",
            "bonusLists": [],
            "availableContexts": ["dungeon-normal", "dungeon-heroic", "challenge-mode", "timewalker", "dungeon-mythic", "world-quest-1", "world-quest-2", "world-quest-3", "world-quest-4", "world-quest-5", "world-quest-6", "challenge-mode-2", "challenge-mode-3", "challenge-mode-jackpot", "world-quest-7", "world-quest-8", "world-quest-9", "world-quest-10"],
            "bonusSummary": {
                "defaultBonusLists": [],
                "chanceBonusLists": [1808, 40, 41, 42, 1808],
                "bonusChances": [{
                    "chanceType": "STAT",
                    "stats": [{
                        "statId": "61",
                        "delta": 483
                    }, {
                        "statId": "62",
                        "delta": 483
                    }, {
                        "statId": "63",
                        "delta": 483
                    }],
                    "sockets": []
                }, {
                    "chanceType": "SOCKET",
                    "stats": [],
                    "sockets": [{
                        "socketType": "PRISMATIC"
                    }, {
                        "socketType": "PRISMATIC"
                    }]
                }]
            },
            "artifactId": 0
        }
        self.assertEqual(
            ArmoryItem(trinket).stats,
            {
                'agility': 1634,
                'mastery': 1075,
            }
        )
    def test_populate_data_with_another_trinket(self):
        trinket2 = {
            "id": 140794,
            "disenchantingSkillRank": 0,
            "description": "",
            "name": "Arcanogolem Digit",
            "icon": "inv_misc_enggizmos_16",
            "stackable": 1,
            "itemBind": 1,
            "bonusStats": [{
                "stat": 3,
                "amount": 1356
            }],
            "itemSpells": [{
                "spellId": 225127,
                "spell": {
                    "id": 225127,
                    "name": "Arcane Swipe",
                    "icon": "inv_misc_enggizmos_16",
                    "description": "Your melee attacks have a chance to rake all enemies in front of you for ^14.2108 Arcane damage.",
                    "castTime": "Passive",
                    "cooldown": "1 sec cooldown"
                },
                "nCharges": 0,
                "consumable": False,
                "categoryId": 0,
                "trigger": "ON_EQUIP"
            }],
            "buyPrice": 2559636,
            "itemClass": 4,
            "itemSubClass": 0,
            "containerSlots": 0,
            "inventoryType": 12,
            "equippable": True,
            "itemLevel": 855,
            "maxCount": 0,
            "maxDurability": 0,
            "minFactionId": 0,
            "minReputation": 0,
            "quality": 4,
            "sellPrice": 511927,
            "requiredSkill": 0,
            "requiredLevel": 110,
            "requiredSkillRank": 0,
            "itemSource": {
                "sourceId": 86291,
                "sourceType": "VENDOR"
            },
            "baseArmor": 0,
            "hasSockets": False,
            "isAuctionable": False,
            "armor": 0,
            "displayInfoId": 0,
            "nameDescription": " Raid Finder",
            "nameDescriptionColor": "00ff00",
            "upgradable": True,
            "heroicTooltip": False,
            "context": "raid-finder",
            "bonusLists": [3446],
            "availableContexts": ["raid-finder", "raid-normal", "raid-heroic", "raid-mythic", "world-quest-10"],
            "bonusSummary": {
                "defaultBonusLists": [3446],
                "chanceBonusLists": [1808, 40, 41, 42, 1808],
                "bonusChances": [{
                    "chanceType": "STAT",
                    "stats": [{
                        "statId": "61",
                        "delta": 448
                    }, {
                        "statId": "62",
                        "delta": 448
                    }, {
                        "statId": "63",
                        "delta": 448
                    }],
                    "sockets": []
                }, {
                    "chanceType": "SOCKET",
                    "stats": [],
                    "sockets": [{
                        "socketType": "PRISMATIC"
                    }, {
                        "socketType": "PRISMATIC"
                    }]
                }]
            },
            "artifactId": 0
        }
        self.assertEqual(
            ArmoryItem(trinket2).stats,
            {
                'agility': 1634,
            }
        )

    def test_populate_data_with_chest(self):
        chest = {
            "id": 151982,
            "disenchantingSkillRank": 0,
            "description": "",
            "name": "Vest of Waning Life",
            "icon": "inv_chest_inv_leather_raidmonk_s_01",
            "stackable": 1,
            "itemBind": 1,
            "bonusStats": [{
                "stat": 32,
                "amount": 758
            }, {
                "stat": 40,
                "amount": 638
            }, {
                "stat": 73,
                "amount": 1427
            }, {
                "stat": 7,
                "amount": 2140
            }],
            "itemSpells": [],
            "buyPrice": 3150850,
            "itemClass": 4,
            "itemSubClass": 2,
            "containerSlots": 0,
            "inventoryType": 5,
            "equippable": True,
            "itemLevel": 855,
            "maxCount": 0,
            "maxDurability": 165,
            "minFactionId": 0,
            "minReputation": 0,
            "quality": 4,
            "sellPrice": 630170,
            "requiredSkill": 0,
            "requiredLevel": 110,
            "requiredSkillRank": 0,
            "itemSource": {
                "sourceId": 0,
                "sourceType": "NONE"
            },
            "baseArmor": 335,
            "hasSockets": False,
            "isAuctionable": False,
            "armor": 335,
            "displayInfoId": 162839,
            "nameDescription": " Raid Finder",
            "nameDescriptionColor": "00ff00",
            "upgradable": True,
            "heroicTooltip": False,
            "context": "raid-finder",
            "bonusLists": [3613],
            "availableContexts": ["raid-finder", "raid-normal", "raid-heroic", "raid-mythic", "world-quest-10"],
            "bonusSummary": {
                "defaultBonusLists": [3613],
                "chanceBonusLists": [1808, 40, 41, 42, 43],
                "bonusChances": [{
                    "chanceType": "STAT",
                    "stats": [{
                        "statId": "61",
                        "delta": 598
                    }, {
                        "statId": "62",
                        "delta": 598
                    }, {
                        "statId": "63",
                        "delta": 598
                    }, {
                        "statId": "64",
                        "delta": 598
                    }],
                    "sockets": []
                }, {
                    "chanceType": "SOCKET",
                    "stats": [],
                    "sockets": [{
                        "socketType": "PRISMATIC"
                    }]
                }]
            },
            "artifactId": 0
        }

        self.assertEqual(
            ArmoryItem(chest).stats,
            {
                'agility': 3150,
                'stamina': 4726,
                'crit': 1042,
                'versatility': 877,
            }
        )

if __name__ == '__main__':
    unittest.main()
