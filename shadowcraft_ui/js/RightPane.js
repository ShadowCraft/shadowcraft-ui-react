import React from "react";
import GoogleAd from 'react-google-ad';
import { connect } from 'react-redux';
import store from './store';

var chartData = {};
var chartOptions = {};

class RightPane extends React.Component {

    render() {

        var realm = this.props.realm.replace("-", " ");
        realm = realm.replace(/\b\w/g, l => l.toUpperCase());

        return (
            <div style={{ flex: 1}}>
                <div id="console-footer" className="awin-medium">
                  <a className="pandaren" href={`http://${this.props.region}.battle.net/wow/en/character/${this.props.realm}/${this.props.name}/advanced`} id="card" target="_blank">
                    <div className="img">
                      <img src={this.props.portrait}/>
                    </div>
                    <span className="info">
                      <span className="name">
                        {this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}
                      </span>
                      <span className="realm">
                        {realm} - {this.props.region.toUpperCase()}
                      </span>
                    </span>
                  </a>
                  <div id="dps">
                    <div className="inner">{Math.round(this.props.dps*10)/10.0}</div>
                  </div>
                </div>
                <div id="logs">
                  <section>
                    <div className="window" id="console">
                      <h3>Notices</h3>
                      <div className="inner"><div className="log items warning" id="warn"> <span className="quality-4"> Band of Crystalline Bone </span> needs an enchantment  </div> </div>
                    </div>
                  </section>
                  <section>
                    <div className="window" id="log">
                      <h3>Log</h3>
                      <div className="inner" />
                    </div>
                  </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        name: store.character.name,
        region: store.character.region,
        realm: store.character.realm,
        portrait: store.character.portrait,
        dps: store.engine.totalDps,
        warnings: store.warnings.warnings
    };
};

export default connect(mapStateToProps)(RightPane);
