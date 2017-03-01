import React from 'react';
import StatPanelElement from './StatPanelElement';
import StatPanelButton from './StatPanelButton';


export default class StatPane extends React.Component {
    render() {
        // console.log(this.props.stats);
        return (
            <div className="panel-tools">
                <section id="summary">
                    <h3>Summary</h3>
                    <div className="inner">
                        <StatPanelElement name="Engine" value="7.0" />
                        <StatPanelElement name="Spec" value="Assassination" />
                        <StatPanelElement name="Boss Adds" value="0" />
                    </div>
                </section>
                <section className="clearfix" id="stats">
                    <h3>Gear Stats</h3>
                    <div className="inner">
                        <StatPanelElement name="Agility" value={this.props.stats.agi} />
                        <StatPanelElement name="Crit" value={this.props.stats.critRating} />
                        <StatPanelElement name="Haste" value={this.props.stats.hasteRating} />
                        <StatPanelElement name="Mastery" value={this.props.stats.masteryRating} />
                        <StatPanelElement name="Versatility" value={this.props.stats.versatility} />
                    </div>
                </section>
                <section id="weights">
                    <h3>Stat Weights</h3>
                    <div className="inner">
                        <StatPanelElement name="Agility" value={this.props.weights.agi} />
                        <StatPanelElement name="Versatility" value={this.props.weights.versatility} />
                        <StatPanelElement name="Crit" value={this.props.weights.crit} />
                        <StatPanelElement name="Mastery" value={this.props.weights.mastery} />
                        <StatPanelElement name="Haste" value={this.props.weights.haste} />
                        <StatPanelElement name="Mainhand DPS" value={this.props.weights.mainHand} />
                        <StatPanelElement name="Offhand DPS" value={this.props.weights.offHand} />
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