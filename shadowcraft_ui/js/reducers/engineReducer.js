// This fixes the engine reducer test complaining about __COMMIT_HASH__ being undefined.
let commitHash = '0';
if (typeof __COMMIT_HASH__ !== 'undefined') {
    commitHash = __COMMIT_HASH__;
}

const initialEngineState = {

    ui_build: commitHash,
    build: "7.2.0-Test",

    // TODO: I'm not a huge fan of hard-coding the layout of the data we get back
    // from the engine here like this, but I don't know if requesting it from the
    // backend or engine is any better.
    ep: {
        agi: 0,
        crit: 0,
        haste: 0,
        mastery: 0,
        versatility: 0
    },
    mh_ep: {
        mh_dps: 0
    },
    oh_ep: {
        oh_dps: 0
    },
    other_ep: {},
    proc_ep: {},
    stats: {
        agility: 0,
        crit: 0,
        haste: 0,
        mastery: 0,
        versatility: 0
    },
    trinket_map: {},
    engine_info: {
        wow_build_target: ''
    },

    talentRanking: {},
    dps_breakdown: [],
    totalDps: 0.0
};

export const engineActionTypes = {
    SET_ENGINE_STATE: 'SET_ENGINE_STATE'
};

export const engineReducer = function (state = initialEngineState, action) {

    switch (action.type) {
        case engineActionTypes.SET_ENGINE_STATE:
            return Object.assign({}, state, action.response);
    }

    return state;
};
