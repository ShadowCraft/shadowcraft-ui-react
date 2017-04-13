import React from "react";
import GoogleAd from 'react-google-ad';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

import store from './store';
import { historyTimeMachine } from './store';

const graphColor = '#dfb73d';

const graphTestData = {
    labels: ['','','','',''],
    datasets: [
        {
            fill: false,
            lineTension: 0,
            backgroundColor: graphColor,
            borderColor: graphColor,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: graphColor,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: graphColor,
            pointHoverBorderColor: graphColor,
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: []
        }
    ]};

const graphOptions={
    legend: {
        display: false,
    },
    layout: {
        padding: {
            left: 15,
            right: 15,
            top: 15,
            bottom: 15,
        }
    }
};

graphTestData['labels'] = Array(graphTestData['datasets'][0]['data'].length).fill('');

class RightPane extends React.Component {

    constructor(props) {
        super(props);
        this.graphClick = this.graphClick.bind(this);
    }
    
    graphClick(elems) {
        // Don't allow the user to continually click the last element and keep resetting
        // to the same data.
        if (elems[0]._index + 1 != this.props.history.dps.length) {
            var historyEntry = this.props.history.data[elems[0]._index];
            store.dispatch(historyTimeMachine(historyEntry.character, historyEntry.settings));
        }
    }

    render() {

        var realm = this.props.realm.replace("-", " ");
        realm = realm.replace(/\b\w/g, l => l.toUpperCase());

        graphTestData['datasets'][0]['data'] = this.props.history.dps;
        graphTestData['labels'] = Array(graphTestData['datasets'][0]['data'].length).fill('');

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
                  <Line data={graphTestData} options={graphOptions} getElementsAtEvent={this.graphClick} />
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
        warnings: store.warnings.warnings,
        history: store.history
    };
};

export default connect(mapStateToProps)(RightPane);
