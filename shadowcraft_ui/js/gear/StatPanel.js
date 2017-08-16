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
        let gems = ITEM_DATA.filter(function (item) {
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

        gems = ITEM_DATA.filter(function (item) {
            return item.is_gem && item.quality == 4 && item['stats'].hasOwnProperty('agility');
        });


        store.dispatch(updateCharacterState('OPTIMIZE_GEMS', { rare: best, epic: gems[0] }));
    }

    optimizeEnchants() {
        // Need the best neck, back, and ring enchants to send to the reducer.
        let actionData = {}
        let slots = ['back', 'neck', 'finger'];
        for (let slot in slots) {
            let enchants = EnchantMap.filter(function (e) {
                return e.slot == slots[slot]
            });

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

        let weightElements = [];
        let sortedWeights = [];
        for (let stat in this.props.weights) {
            sortedWeights.push([stat, this.props.weights[stat]]);
        }
        sortedWeights.sort(function(a, b) { return b[1] - a[1]; });

        for (let idx in sortedWeights) {
            let name = sortedWeights[idx][0].charAt(0).toUpperCase() + sortedWeights[idx][0].slice(1);
            if (name == "Agi") {
                name = "Agility";
            }
            else if (name == "Ap") {
                continue;
            }

            weightElements.push(<StatPanelElement key={name} name={name} value={round3(sortedWeights[idx][1])} />);
        }

        let setWeightElements = [];
        sortedWeights = [];
        for (let key in this.props.otherEP) {
            if (key.startsWith("rogue_")) {
                let name = key.slice(6);
                name = name.charAt(0).toUpperCase() + name.slice(1);
                name = name.replace(/_/, ' ');
                sortedWeights.push([name, this.props.otherEP[key]]);
            }
        }
        sortedWeights.sort(function(a, b) { return a[0] - b[0]; });
        for (let idx in sortedWeights) {
            setWeightElements.push(<StatPanelElement key={sortedWeights[idx][0]} name={sortedWeights[idx][0]} value={round3(sortedWeights[idx][1])} />);
        }

        return (
            <div className="panel-tools">
                <section id="summary">
                    <h3>Summary</h3>
                    <div className="inner">
                        <StatPanelElement name="Engine" value={this.props.engineTarget} />
                        <StatPanelElement name="Spec" value={spec} />
                        <StatPanelElement name="Boss Adds" value={this.props.settings.current ? this.props.settings.current.num_boss_adds : 0} />
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
                        {weightElements}
                        <StatPanelElement name="Mainhand DPS" value={round3(this.props.mhEP)} />
                        <StatPanelElement name="Offhand DPS" value={round3(this.props.ohEP)} />
                        {setWeightElements}
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

const mapStateToProps = function (store) {
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
