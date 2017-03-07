import React from 'react';
import { connect } from 'react-redux';
import store from '../store';

import BreakdownList from './BreakdownList';
import AdvancedPaneSettings from './AdvancedPaneSettings';

class AdvancedPane extends React.Component {

    getHeadingList(settings) {
        return settings
            .filter(section => section.spec.toLowerCase() === 'all' || section.spec.toLowerCase() === this.props.active_spec)
            .map((section, index) => <AdvancedPaneSettings key={index} section={section} />);
    }

    render() {
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="advanced">
                <div className="panel-tools">
                    <section id="dpsbreakdown">
                        <h3>DPS Breakdown</h3>
                        <BreakdownList list={this.props.breakdown} />
                    </section>
                    <section id="engineinfo">
                        <h3>Version Info</h3>
                        <div className="inner">
                            <div className="stat"> <span className="key">UI </span> <span className="val">{this.props.ui_build}</span> </div>
                            <div className="stat"> <span className="key">Engine </span> <span className="val">{this.props.engine_build}</span> </div>
                        </div>
                    </section>
                </div>
                <div className="panel-content">
                    {this.getHeadingList(this.props.layout)}
                </div>
            </div>

        );
    }
}

const mapStateToProps = function(store) {
    return {
        active_spec: store.character.active,
        ui_build: store.engine.ui_build,
        engine_build: store.engine.build,
        breakdown: store.engine.dps_breakdown,
        layout: store.settings.layout,
    };
};

export default connect(mapStateToProps)(AdvancedPane);
