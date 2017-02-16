import React from "react"
import ArtifactFrame from './ArtifactFrame'

const kingslayer_layout = {
    artifact: 'kingslayers',
    primary_trait: 192759,
    traits: {
        "ks_assassinsblades": {
            id: 214368,
            x: 375,
            y: 243,
            icon: "ability_rogue_shadowstrikes",
            ring: "thin",
            max_rank: 1
        },
        "ks_bagoftricks": {
            id: 192657,
            x: 106,
            y: 255,
            icon: "rogue_paralytic_poison",
            ring: "dragon",
            max_rank: 1
        },
        "ks_balancedblades": {
            id: 192326,
            x: 322,
            y: 365,
            icon: "ability_rogue_restlessblades",
            ring: "thin",
            max_rank: 3
        },
        "ks_embrace": {
            id: 192323,
            x: 152,
            y: 455,
            icon: "spell_shadow_nethercloak",
            ring: "thin",
            max_rank: 3
        },
        "ks_fadeintoshadows": {
            id: 192923,
            x: 106,
            y: 552,
            icon: "inv_artifact_bloodoftheassassinated",
            ring: "dragon",
            max_rank: 1
        },
        "ks_fromtheshadows": {
            id: 192428,
            x: 548,
            y: 196,
            icon: "ability_rogue_deadlybrew",
            ring: "dragon",
            max_rank: 1
        },
        "ks_gushingwound": {
            id: 192329,
            x: 35,
            y: 458,
            icon: "ability_rogue_bloodsplatter",
            ring: "thin",
            max_rank: 3
        },
        "ks_kingsbane": {
            id: 192759,
            x: 442,
            y: 215,
            icon: "inv_knife_1h_artifactgarona_d_01",
            ring: "thick",
            max_rank: 1
        },
        "ks_masteralchemist": {
            id: 192318,
            x: 51,
            y: 344,
            icon: "trade_brewpoison",
            ring: "thin",
            max_rank: 3
        },
        "ks_masterassassin": {
            id: 192349,
            x: 166,
            y: 348,
            icon: "ability_rogue_deadliness",
            ring: "thin",
            max_rank: 3
        },
        "ks_poisonknives": {
            id: 192376,
            x: 417,
            y: 376,
            icon: "ability_rogue_dualweild",
            ring: "thin",
            max_rank: 3
        },
        "ks_serratededge": {
            id: 192315,
            x: 537,
            y: 288,
            icon: "ability_warrior_bloodbath",
            ring: "thin",
            max_rank: 3
        },
        "ks_shadowswift": {
            id: 192422,
            x: 229,
            y: 384,
            icon: "rogue_burstofspeed",
            ring: "thin",
            max_rank: 1
        },
        "ks_shadowwalker": {
            id: 192345,
            x: 180,
            y: 276,
            icon: "ability_rogue_sprint",
            ring: "thin",
            max_rank: 3
        },
        "ks_slayersprecision": {
            id: 214928,
            x: 643,
            y: 164,
            icon: "inv_knife_1h_artifactgarona_d_02dual",
            ring: "dragon",
            max_rank: 20
        },
        "ks_surgeoftoxins": {
            id: 192424,
            x: 466,
            y: 324,
            icon: "ability_rogue_deviouspoisons",
            ring: "thin",
            max_rank: 1
        },
        "ks_toxicblades": {
            id: 192310,
            x: 314,
            y: 266,
            icon: "ability_rogue_disembowel",
            ring: "thin",
            max_rank: 3
        },
        "ks_urgetokill": {
            id: 192384,
            x: 248,
            y: 282,
            icon: "ability_rogue_improvedrecuperate",
            ring: "thin",
            max_rank: 1
        },
    },
    lines: [
        {
            trait1: "ks_toxicblades",
            trait2: "ks_urgetokill"
        },
        {
            trait1: "ks_toxicblades",
            trait2: "ks_balancedblades"
        },
        {
            trait1: "ks_toxicblades",
            trait2: "ks_assassinsblades"
        },
        {
            trait1: "ks_serratededge",
            trait2: "ks_fromtheshadows"
        },
        {
            trait1: "ks_serratededge",
            trait2: "ks_surgeoftoxins"
        },
        {
            trait1: "ks_masteralchemist",
            trait2: "ks_bagoftricks"
        },
        {
            trait1: "ks_masteralchemist",
            trait2: "ks_masterassassin"
        },
        {
            trait1: "ks_masteralchemist",
            trait2: "ks_gushingwound"
        },
        {
            trait1: "ks_embrace",
            trait2: "ks_fadeintoshadows"
        },
        {
            trait1: "ks_embrace",
            trait2: "ks_shadowswift"
        },
        {
            trait1: "ks_balancedblades",
            trait2: "ks_shadowswift"
        },
        {
            trait1: "ks_balancedblades",
            trait2: "ks_poisonknives"
        },
        {
            trait1: "ks_gushingwound",
            trait2: "ks_masterassassin"
        },
        {
            trait1: "ks_gushingwound",
            trait2: "ks_fadeintoshadows"
        },
        {
            trait1: "ks_shadowwalker",
            trait2: "ks_bagoftricks"
        },
        {
            trait1: "ks_shadowwalker",
            trait2: "ks_urgetokill"
        },
        {
            trait1: "ks_masterassassin",
            trait2: "ks_shadowswift"
        },
        {
            trait1: "ks_masterassassin",
            trait2: "ks_urgetokill"
        },
        {
            trait1: "ks_poisonknives",
            trait2: "ks_surgeoftoxins"
        },
        {
            trait1: "ks_poisonknives",
            trait2: "ks_assassinsblades"
        },
        {
            trait1: "ks_kingsbane",
            trait2: "ks_assassinsblades"
        },
    ],
    relics: {
    }
}

const dreadblades_layout = {
    artifact: "dreadblades",
    primary_trait: 202665,
    traits: {
        "db_blackpowder": {
            id: 216230,
            x: 623,
            y: 384,
            icon: "inv_weapon_rifle_01",
            ring: "thin",
            max_rank: 3
        },
        "db_bladedancer": {
            id: 202507,
            x: 344,
            y: 443,
            icon: "ability_warrior_bladestorm",
            ring: "thin",
            max_rank: 3
        },
        "db_blademaster": {
            id: 202628,
            x: 564,
            y: 312,
            icon: "ability_warrior_challange",
            ring: "thin",
            max_rank: 1
        },
        "db_blunderbuss": {
            id: 202897,
            x: 653,
            y: 183,
            icon: "inv_weapon_rifle_01",
            ring: "dragon",
            max_rank: 1
        },
        "db_blurredtime": {
            id: 202769,
            x: 662,
            y: 277,
            icon: "ability_rogue_quickrecovery",
            ring: "dragon",
            max_rank: 1
        },
        "db_curse": {
            id: 202665,
            x: 393,
            y: 337,
            icon: "inv_sword_1h_artifactskywall_d_01dual",
            ring: "thick",
            max_rank: 1
        },
        "db_cursededges": {
            id: 202463,
            x: 262,
            y: 412,
            icon: "inv_sword_33",
            ring: "thin",
            max_rank: 1
        },
        "db_cursedleather": {
            id: 202521,
            x: 581,
            y: 235,
            icon: "spell_rogue_deathfromabove",
            ring: "thin",
            max_rank: 3
        },
        "db_cursedsteel": {
            id: 214929,
            x: 126,
            y: 199,
            icon: "inv_sword_1h_artifactskywall_d_02dual",
            ring: "dragon",
            max_rank: 20
        },
        "db_deception": {
            id: 202755,
            x: 483,
            y: 197,
            icon: "ability_rogue_disguise",
            ring: "thin",
            max_rank: 1
        },
        "db_fatebringer": {
            id: 202524,
            x: 168,
            y: 400,
            icon: "ability_rogue_cuttothechase",
            ring: "thin",
            max_rank: 3
        },
        "db_fatesthirst": {
            id: 202514,
            x: 302,
            y: 313,
            icon: "ability_rogue_waylay",
            ring: "thin",
            max_rank: 3
        },
        "db_fortunesboon": {
            id: 202907,
            x: 470,
            y: 290,
            icon: "ability_rogue_surpriseattack2",
            ring: "thin",
            max_rank: 3
        },
        "db_fortunestrikes": {
            id: 202530,
            x: 470,
            y: 383,
            icon: "ability_rogue_improvedrecuperate",
            ring: "thin",
            max_rank: 3
        },
        "db_ghostlyshell": {
            id: 202533,
            x: 66,
            y: 450,
            icon: "spell_shadow_nethercloak",
            ring: "thin",
            max_rank: 3
        },
        "db_greed": {
            id: 202820,
            x: 68,
            y: 574,
            icon: "warrior_skullbanner",
            ring: "dragon",
            max_rank: 1
        },
        "db_gunslinger": {
            id: 202522,
            x: 389,
            y: 213,
            icon: "inv_weapon_rifle_07",
            ring: "thin",
            max_rank: 3
        },
        "db_hiddenblade": {
            id: 202753,
            x: 170,
            y: 549,
            icon: "ability_ironmaidens_bladerush",
            ring: "thin",
            max_rank: 1
        },
    },
    lines: [
        {
            trait1: "db_curse",
            trait2: "db_cursededges"
        },
        {
            trait1: "db_blunderbuss",
            trait2: "db_cursedleather"
        },
        {
            trait1: "db_greed",
            trait2: "db_ghostlyshell"
        },
        {
            trait1: "db_blurredtime",
            trait2: "db_blackpowder"
        },
        {
            trait1: "db_deception",
            trait2: "db_cursedleather"
        },
        {
            trait1: "db_deception",
            trait2: "db_gunslinger"
        },
        {
            trait1: "db_deception",
            trait2: "db_fortunesboon"
        },
        {
            trait1: "db_hiddenblade",
            trait2: "db_fatebringer"
        },
        {
            trait1: "db_hiddenblade",
            trait2: "db_bladedancer"
        },
        {
            trait1: "db_blademaster",
            trait2: "db_blackpowder"
        },
        {
            trait1: "db_blademaster",
            trait2: "db_fortunesboon"
        },
        {
            trait1: "db_blackpowder",
            trait2: "db_fortunestrikes"
        },
        {
            trait1: "db_bladedancer",
            trait2: "db_fortunestrikes"
        },
        {
            trait1: "db_bladedancer",
            trait2: "db_cursededges"
        },
        {
            trait1: "db_fatesthirst",
            trait2: "db_gunslinger"
        },
        {
            trait1: "db_fatesthirst",
            trait2: "db_fatebringer"
        },
        {
            trait1: "db_fatesthirst",
            trait2: "db_cursededges"
        },
        {
            trait1: "db_fatebringer",
            trait2: "db_ghostlyshell"
        },
    ]
}

const fangs_layout = {
    artifact: "fangs",
    primary_trait: 209782,
    traits: {
        "fangs_akaarissoul": {
            id: 209835,
            x: 580,
            y: 311,
            icon: "ability_warlock_soullink",
            ring: "dragon",
            max_rank: 1
        },
        "fangs_catlike": {
            id: 197241,
            x: 409,
            y: 328,
            icon: "inv_pet_cats_calicocat",
            ring: "thin",
            max_rank: 3
        },
        "fangs_demonskiss": {
            id: 197233,
            x: 284,
            y: 564,
            icon: "ability_priest_voidentropy",
            ring: "thin",
            max_rank: 3
        },
        "fangs_embrace": {
            id: 197604,
            x: 524,
            y: 449,
            icon: "ability_stealth",
            ring: "thin",
            max_rank: 1
        },
        "fangs_energetic": {
            id: 197239,
            x: 267,
            y: 473,
            icon: "inv_knife_1h_pvppandarias3_c_02",
            ring: "thin",
            max_rank: 3
        },
        "fangs_finality": {
            id: 197406,
            x: 162,
            y: 529,
            icon: "ability_rogue_eviscerate",
            ring: "dragon",
            max_rank: 1
        },
        "fangs_flickering": {
            id: 197256,
            x: 403,
            y: 454,
            icon: "ability_rogue_sprint_blue",
            ring: "thin",
            max_rank: 1
        },
        "fangs_fortunesbite": {
            id: 197369,
            x: 613,
            y: 380,
            icon: "ability_rogue_masterofsubtlety",
            ring: "thin",
            max_rank: 3
        },
        "fangs_ghostarmor": {
            id: 197244,
            x: 338,
            y: 412,
            icon: "achievement_halloween_ghost_01",
            ring: "thin",
            max_rank: 3
        },
        "fangs_goremawsbite": {
            id: 209782,
            x: 646,
            y: 177,
            icon: "inv_knife_1h_artifactfangs_d_01",
            ring: "thick",
            max_rank: 1
        },
        "fangs_gutripper": {
            id: 197234,
            x: 570,
            y: 225,
            icon: "ability_rogue_eviscerate",
            ring: "thin",
            max_rank: 3
        },
        "fangs_legionblade": {
            id: 214930,
            x: 230,
            y: 361,
            icon: "inv_knife_1h_artifactfangs_d_02dual",
            ring: "dragon",
            max_rank: 20
        },
        "fangs_precision": {
            id: 197235,
            x: 417,
            y: 535,
            icon: "ability_rogue_unfairadvantage",
            ring: "thin",
            max_rank: 3
        },
        "fangs_quietknife": {
            id: 197231,
            x: 493,
            y: 389,
            icon: "ability_backstab",
            ring: "thin",
            max_rank: 3
        },
        "fangs_second": {
            id: 197610,
            x: 338,
            y: 501,
            icon: "inv_throwingknife_07",
            ring: "thin",
            max_rank: 1
        },
        "fangs_shadowfangs": {
            id: 221856,
            x: 690,
            y: 292,
            icon: "inv_misc_blacksaberonfang",
            ring: "thin",
            max_rank: 1
        },
        "fangs_shadownova": {
            id: 209781,
            x: 503,
            y: 168,
            icon: "spell_fire_twilightnova",
            ring: "dragon",
            max_rank: 1
        },
        "fangs_soulshadows": {
            id: 197386,
            x: 476,
            y: 238,
            icon: "inv_knife_1h_grimbatolraid_d_03",
            ring: "thin",
            max_rank: 3
        },
    },
    lines: [
        {
            trait1: "fangs_goremawsbite",
            trait2: "fangs_shadowfangs"
        },
        {
            trait1: "fangs_quietknife",
            trait2: "fangs_akaarissoul"
        },
        {
            trait1: "fangs_quietknife",
            trait2: "fangs_flickering"
        },
        {
            trait1: "fangs_demonskiss",
            trait2: "fangs_finality"
        },
        {
            trait1: "fangs_demonskiss",
            trait2: "fangs_precision"
        },
        {
            trait1: "fangs_gutripper",
            trait2: "fangs_catlike"
        },
        {
            trait1: "fangs_gutripper",
            trait2: "fangs_shadowfangs"
        },
        {
            trait1: "fangs_precision",
            trait2: "fangs_second"
        },
        {
            trait1: "fangs_precision",
            trait2: "fangs_embrace"
        },
        {
            trait1: "fangs_fortunesbite",
            trait2: "fangs_embrace"
        },
        {
            trait1: "fangs_fortunesbite",
            trait2: "fangs_shadowfangs"
        },
        {
            trait1: "fangs_soulshadows",
            trait2: "fangs_shadownova"
        },
        {
            trait1: "fangs_soulshadows",
            trait2: "fangs_catlike"
        },
        {
            trait1: "fangs_energetic",
            trait2: "fangs_finality"
        },
        {
            trait1: "fangs_energetic",
            trait2: "fangs_second"
        },
        {
            trait1: "fangs_energetic",
            trait2: "fangs_ghostarmor"
        },
        {
            trait1: "fangs_catlike",
            trait2: "fangs_ghostarmor"
        },
        {
            trait1: "fangs_ghostarmor",
            trait2: "fangs_flickering"
        },
    ]
}

export const kingslayer_frame = <ArtifactFrame layout={kingslayer_layout}/>;
export const dreadblades_frame = <ArtifactFrame layout={dreadblades_layout}/>;
export const fangs_frame = <ArtifactFrame layout={fangs_layout}/>;
