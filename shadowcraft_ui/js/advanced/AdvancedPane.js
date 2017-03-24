import React from 'react';
import { connect } from 'react-redux';
import store from '../store';

import BreakdownList from './BreakdownList';
import AdvancedPaneSection from './AdvancedPaneSection';

class AdvancedPane extends React.Component {

    render() {

        let headinglist = this.props.layout
            .filter(section => section.spec.toLowerCase() === 'all' || section.spec === this.props.active_spec)
            .map((section, index) => <AdvancedPaneSection key={index} section={section} />);

        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="advanced">
                <div className="panel-tools">
                    <section id="dpsbreakdown">
                        <h3>DPS Breakdown</h3>
                        <BreakdownList list={this.props.breakdown} max={this.props.dps} />
                    </section>
                    <section id="engineinfo">
                        <h3>Version Info</h3>
                        <div className="inner">
                            <div className="stat"> <span className="key">UI </span> <span className="val">{this.props.ui_build}</span> </div>
                            <div className="stat"> <span className="key">Engine Build Target</span> <span className="val">{this.props.engine_info.wow_build_target}</span> </div>
                            <div className="stat"> <span className="key">Engine Shadowcraft Build</span> <span className="val">{this.props.engine_info.shadowcraft_build}</span> </div>
                        </div>
                    </section>
                </div>
                <div className="panel-content">
                    {headinglist}
                </div>
            </div>

        );
    }
}

const mapStateToProps = function (store) {
    return {
        active_spec: store.character.active,
        ui_build: store.engine.ui_build,
        engine_info: store.engine.engine_info,
        breakdown: store.engine.breakdown,
        dps: store.engine.totalDps,
        layout: store.settings.layout,
    };
};

export default connect(mapStateToProps)(AdvancedPane);
