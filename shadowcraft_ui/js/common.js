let RELIC_ILVL_MAPPING = {
    650: 2,
    660: 2,
    680: 2,
    682: 2,
    685: 2,
    690: 2,
    694: 3,
    695: 3,
    700: 4,
    705: 5,
    707: 6,
    710: 7,
    715: 8,
    719: 9,
    720: 9,
    725: 10,
    730: 12,
    735: 13,
    740: 14,
    743: 15,
    745: 15,
    750: 17,
    755: 18,
    756: 18,
    760: 19,
    765: 21,
    768: 21,
    769: 21,
    770: 22,
    775: 23,
    780: 24,
    790: 27,
    805: 31,
    810: 32,
    815: 33,
    820: 35,
    825: 36,
    830: 37,
    835: 39,
    840: 40,
    845: 42,
    850: 43,
    855: 45,
    860: 46,
    865: 48,
    870: 49,
    875: 51,
    880: 52,
    885: 53,
    890: 55,
    895: 56,
    900: 58,
    905: 59,
    910: 61,
    915: 62,
    920: 64,
    925: 65,
    930: 67,
    935: 68,
    940: 70,
    945: 71,
    950: 72,
    955: 74
};

export function getArtifactIlvlChange(oldRelic, newRelic)
{
    return RELIC_ILVL_MAPPING[newRelic] - RELIC_ILVL_MAPPING[oldRelic];
}

// Recalculates a stat block based on a change in item level.
export function recalculateStats(baseStats, ilvlChange) {
    let newStats;

    if (ilvlChange != 0) {
        newStats = {};
        let ilvlMultiplier = 1.0 / Math.pow(1.15, (ilvlChange / -15.0));
        let secondaryMultiplier = Math.pow(1.0037444020662509239443726693104, ilvlChange);
        
        for (let stat in baseStats) {
            newStats[stat] = baseStats[stat];
            if (stat == 'speed') {
                continue;
            }
            
            if (stat != 'agility' && stat != 'stamina') {
                newStats[stat] *= secondaryMultiplier;
            }
            
            newStats[stat] = Math.round(newStats[stat] * ilvlMultiplier);
        }
    }
    else
    {
        newStats = Object.assign({}, baseStats);
    }

    return newStats;
}

