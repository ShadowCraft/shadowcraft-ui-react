import React from "react";
import GoogleAd from 'react-google-ad';

var chartData = {};
var chartOptions = {};

export default class RightPane extends React.Component {

    render() {

      // console.log(this.props.data)
        return (
            <div style={{ flex: 1}}>
                <div id="console-footer" className="awin-medium">
                  <a className="pandaren" href={`http://${this.props.data.region}.battle.net/wow/en/character/${this.props.data.realm}/${this.props.data.name}/advanced`} id="card" target="_blank">
                    <div className="img">
                      <img src={this.props.data.portrait}/>
                    </div>
                    <span className="info">
                      <span className="name">
                        {this.props.data.name}
                      </span>
                      <span className="realm">
                        {this.props.data.realm}-{this.props.data.region}
                      </span>
                    </span>
                  </a>
                  <div id="dps">
                    {/*TODO: plumb engine output*/}
                    <div className="inner">468306.3 DPS</div>
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
