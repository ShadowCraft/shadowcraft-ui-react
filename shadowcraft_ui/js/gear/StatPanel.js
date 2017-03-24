import React from 'react';
import { connect } from 'react-redux';
import store from '../store';

import StatPanelElement from './StatPanelElement';
import StatPanelButton from './StatPanelButton';

function round3(val) {
    return Math.round(val * 1000.0) / 1000.0;
}

class StatPane extends React.Component {
    render() {

        var spec;
        if (this.props.spec == 'a') {
            spec = 'Assassination';
        }
        else if (this.props.spec == 'Z') {
            spec = 'Outlaw';
        }
        else if (this.props.spec == 'b') {
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
                        <StatPanelElement name="Engine" value={this.props.engine_target} />
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
                        <StatPanelElement name="Mainhand DPS" value={round3(this.props.mh_ep)} />
                        <StatPanelElement name="Offhand DPS" value={round3(this.props.oh_ep)} />
                    </div>
                </section>
                <section>
                    <h3>Toolbox</h3>
                    <div className="inner">
                        <StatPanelButton id='optimizeGems' name='Optimize Gems' />
                        <StatPanelButton id='optimizeEnchants' name='Optimize Enchants' />
                        <StatPanelButton id='lockAll' name='Lock All' />
                        <StatPanelButton id='unlockAll' name='Unlock All' />
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
        mh_ep: store.engine.mh_ep.mh_dps,
        oh_ep: store.engine.oh_ep.oh_dps,
        engine_target: store.engine.engine_info.wow_build_target,
        spec: store.character.active,
        settings: store.settings
    };
};
export default connect(mapStateToProps)(StatPane);
