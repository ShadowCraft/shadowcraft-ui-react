import React from 'react'
import StatPanelElement from './StatPanelElement'
import StatPanelButton from './StatPanelButton'


export default class StatPane extends React.Component {
    render() {
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
                        <StatPanelElement name="Agility" value="24" />
                        <StatPanelElement name="Crit" value="243" />
                        <StatPanelElement name="Haste" value="2334" />
                        <StatPanelElement name="Indestructible" value="234234" />
                        <StatPanelElement name="Mastery" value="342" />
                        <StatPanelElement name="Stamina" value="23423" />
                        <StatPanelElement name="Versatility" value="234" />
                    </div>
                </section>
                <section id="weights">
                    <h3>Stat Weights</h3>
                    <div className="inner">
                        <StatPanelElement name="Agility" value="24" />
                        <StatPanelElement name="Attack Power" value="34" />
                        <StatPanelElement name="Versatility" value="24" />
                        <StatPanelElement name="Crit" value="243" />
                        <StatPanelElement name="Mastery" value="342" />
                        <StatPanelElement name="Haste" value="2334" />
                        <StatPanelElement name="Mainhand DPS" value="233" />
                        <StatPanelElement name="Offhand DPS" value="23" />
                    </div>
                </section>
                <section>
                    <h3>Toolbox</h3>
                    <div className="inner">
                        <StatPanelButton name='Optimize Gems' />
                        <StatPanelButton name='Optimize Enchants' />
                        <StatPanelButton name='Lock All' />
                        <StatPanelButton name='Unlock All' />
                    </div>
                </section>
            </div >
        )
    }
}