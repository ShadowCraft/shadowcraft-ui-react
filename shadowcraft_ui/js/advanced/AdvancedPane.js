import React from 'react';
import BreakdownList from './BreakdownList';
import AdvancedPaneSettings from './AdvancedPaneSettings';

export default class AdvancedPane extends React.Component {

    getHeadingList(settings) {
        return settings
            .filter(section => section.spec.toLowerCase() === 'all' || section.spec.toLowerCase() === this.props.spec.toLowerCase())
            .map((section, index) => <AdvancedPaneSettings key={index} section={section} />);
    }

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
                    {/*<div id="settings" className="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide">*/}
                    {this.getHeadingList(this.props.settings)}
                    {/*</div >*/}
                </div>
            </div>

        );
    }
}