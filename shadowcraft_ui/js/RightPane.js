import React from "react"
import GoogleAd from 'react-google-ad'

var LineChart = require("react-chartjs").Line;
var chartData = {};
var chartOptions = {};

export default class RightPane extends React.Component {

    render() {
        return (
            <div style={{ flex: 1}}>
                <div id="console-footer" className="awin-medium">
                  <a className="pandaren" href="http://us.battle.net/wow/en/character/aerie-peak/tamen/advanced" id="card" target="_blank">
                    <div className="img">
                      <img src="http://us.battle.net/static-render/us/aerie-peak/10/124222474-avatar.jpg"/>
                    </div>
                    <span className="info">
                      <span className="name">
                        Tamen
                      </span>
                      <span className="realm">
                        Aerie Peak-US
                      </span>
                    </span>
                  </a>
                  <div id="dps">
                    <div className="inner">468306.3 DPS</div>
                  </div>
                  <LineChart data={chartData} options={chartOptions}/>
                  <div className="ad">
                    <GoogleAd client="ca-pub-0438541591834443" slot="0003037760" format="rectangle"/>
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
                      <div className="inner"></div>
                    </div>
                  </section>
                </div>
            </div>
        )
    }
}
