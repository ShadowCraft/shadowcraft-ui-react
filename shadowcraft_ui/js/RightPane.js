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
    },
    scales: {
        xAxes:[{gridLines: {display: true, color: "#262626"}}],
        yAxes:[{gridLines: {display: true, color: "#262626"}}]
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

        let dpsChange = 0.0;
        let dpsChangePct = 0.0;
        let historyLength = this.props.history.dps.length;
        if (historyLength > 1) {
            dpsChange = Math.round((this.props.history.dps[historyLength-1] - this.props.history.dps[historyLength-2]) * 100.0) / 100.0;
            dpsChangePct = Math.round(((dpsChange / this.props.history.dps[historyLength-1]) * 100.0) * 100.0) / 100.0;
        }

        let warnings = this.props.warnings.map((g, i) =>
            <div className="log warning" key={i}>{this.props.warnings[i]}</div>);

        let armoryRegion = "";
        switch (this.props.region) {
            case 'eu':
                armoryRegion = "en-gb";
                break;
            case 'kr':
                armoryRegion = "ko-kr";
                break;
            case 'tw':
                armoryRegion = "zh-tw";
                break;
            case 'us':
            default:
                armoryRegion = "en-us";
                break;
        }

        return (
            <div className="right-pane flex-max-height">
                <a href="/" className="logo" />
                <a href={`https://worldofwarcraft.com/${armoryRegion}/character/${this.props.realm}/${this.props.name}`} className="card" target="_blank">
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
                    <div className="inner">{Math.round(this.props.dps*10)/10.0} {dpsChange < 0.0 ? (<em className="n">({dpsChange} / {dpsChangePct}%)</em>):(<em className="p">(+{dpsChange} / +{dpsChangePct}%)</em>)}</div>
                </div>
                <Line data={graphTestData} options={graphOptions} getElementsAtEvent={this.graphClick} />
                <div id="logs">
                    <section>
                        <div className="window" id="console">
                            <h3>Notices</h3>
                            <div className="inner">
                                {warnings}
                            </div>
                        </div>
                    </section>
                    <section className="flex-fill-vertical">
                        <div className="window flex-fill-vertical" id="log">
                            <h3>Log</h3>
                            <div className="inner" style={{flexGrow: 1}} />
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
