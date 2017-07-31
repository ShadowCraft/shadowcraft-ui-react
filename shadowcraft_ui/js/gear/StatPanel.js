import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { updateCharacterState } from '../store';

import StatPanelElement from './StatPanelElement';
import StatPanelButton from './StatPanelButton';
import EnchantMap from './EnchantMap';
import { getStatValue } from '../common';

function round3(val) {
    return Math.round(val * 1000.0) / 1000.0;
}

class StatPane extends React.Component {

    optimizeGems() {
        // We only care about the blue gems, and we'll send over the one agility purple
        // gem too so that one is equipped somewhere.
        let gems = ITEM_DATA.filter(function(item) {
            return item.is_gem && item.quality == 3;
        });

        let bestVal = -1.0;
        let best = null;
        for (let idx in gems) {
            let value = getStatValue(gems[idx].stats, this.props.weights);
            if (value > bestVal) {
                bestVal = value;
                best = gems[idx];
            }
        }

        gems = ITEM_DATA.filter(function(item) {
            return item.is_gem && item.quality == 4 && item['stats'].hasOwnProperty('agility');
        });


        store.dispatch(updateCharacterState('OPTIMIZE_GEMS', {rare: best, epic: gems[0]}));
    }

    optimizeEnchants() {
        // Need the best neck, back, and ring enchants to send to the reducer.
        let actionData = {}
        let slots = ['back', 'neck', 'finger'];
        for (let slot in slots) {
            let enchants = EnchantMap.filter(function(e) {
                return e.slot == slots[slot]});

            let bestVal = -1.0;
            let best = 0;
            for (let idx in enchants) {
                // TODO: this is a copy of ItemSelectPopup.getEnchantValue. That could
                // probably be moved to common.js.
                let value = getStatValue(enchants[idx].stats, this.props.weights);
                if (enchants[idx].ep_id) {
                    value += this.props.otherEP[enchants[idx].ep_id];
                }

                if (value > bestVal) {
                    bestVal = value;
                    best = enchants[idx].id;
                }
            }

            actionData[slots[slot]] = best;
        }

        store.dispatch(updateCharacterState('OPTIMIZE_ENCHANTS', actionData));
    }

    render() {

        var spec;
        if (this.props.activeSpec == 'a') {
            spec = 'Assassination';
        }
        else if (this.props.activeSpec == 'Z') {
            spec = 'Outlaw';
        }
        else if (this.props.activeSpec == 'b') {
            spec = 'Subtlety';
        }

        // This gets called once before the settings object gets setup so we
        // need to make sure the current settings exist before trying to use
        // them.
        var numAdds = 0;
        if ('current' in this.props.settings) {
            numAdds = this.props.settings.current['general.settings.num_boss_adds'];
        }

        return (
            <div className="panel-tools">
                <section id="summary">
                    <h3>Summary</h3>
                    <div className="inner">
                        <StatPanelElement name="Engine" value={this.props.engineTarget} />
                        <StatPanelElement name="Spec" value={spec} />
                        <StatPanelElement name="Boss Adds" value={numAdds} />
                    </div>
                </section>
                <section className="clearfix" id="stats">
                    <h3>Gear Stats</h3>
                    <div className="inner">
                        <StatPanelElement name="Agility" value={Math.round(this.props.stats.agility)} />
                        <StatPanelElement name="Crit" value={Math.round(this.props.stats.crit)} />
                        <StatPanelElement name="Haste" value={Math.round(this.props.stats.haste)} />
                        <StatPanelElement name="Mastery" value={Math.round(this.props.stats.mastery)} />
                        <StatPanelElement name="Versatility" value={Math.round(this.props.stats.versatility)} />
                    </div>
                </section>
                <section id="weights">
                    <h3>Stat Weights</h3>
                    <div className="inner">
                        <StatPanelElement name="Agility" value={round3(this.props.weights.agi)} />
                        <StatPanelElement name="Versatility" value={round3(this.props.weights.versatility)} />
                        <StatPanelElement name="Crit" value={round3(this.props.weights.crit)} />
                        <StatPanelElement name="Mastery" value={round3(this.props.weights.mastery)} />
                        <StatPanelElement name="Haste" value={round3(this.props.weights.haste)} />
                        <StatPanelElement name="Mainhand DPS" value={round3(this.props.mhEP)} />
                        <StatPanelElement name="Offhand DPS" value={round3(this.props.ohEP)} />
                    </div>
                </section>
                <section>
                    <h3>Toolbox</h3>
                    <div className="inner">
                        <StatPanelButton id='optimizeGems' name='Optimize Gems' onClick={this.optimizeGems.bind(this)} />
                        <StatPanelButton id='optimizeEnchants' name='Optimize Enchants' onClick={this.optimizeEnchants.bind(this)} />
                    </div>
                </section>
            </div >
        );
    }
}

const mapStateToProps = function(store) {
    return {
        stats: store.engine.stats,
        weights: store.engine.ep,
        mhEP: store.engine.mh_ep.mh_dps,
        ohEP: store.engine.oh_ep.oh_dps,
        otherEP: store.engine.other_ep,
        engineTarget: store.engine.engine_info.wow_build_target,
        activeSpec: store.character.active,
        settings: store.settings
    };
};
export default connect(mapStateToProps)(StatPane);
