import React from 'react';
import BreakdownList from './BreakdownList';
import SettingsPane from '../settings/SettingsPane';

export default class AdvancedPane extends React.Component {

    render() {
        // console.log(this.props.data)
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="advanced">
                <div className="panel-tools">
                    <section id="dpsbreakdown">
                        <h3>DPS Breakdown</h3>
                        <BreakdownList list={this.props.data.breakdown} />
                    </section>
                    <section id="engineinfo">
                        <h3>Version Info</h3>
                        <div className="inner">
                            <div className="stat"> <span className="key">UI </span> <span className="val">{this.props.data.build.ui}</span> </div>
                            <div className="stat"> <span className="key">Engine </span> <span className="val">{this.props.data.build.engine}</span> </div>
                        </div>
                    </section>
                </div>
                <div className="panel-content">
                    <SettingsPane spec={this.props.spec} settings={this.props.settings} />
                </div>
            </div>
            
        );
    }
}