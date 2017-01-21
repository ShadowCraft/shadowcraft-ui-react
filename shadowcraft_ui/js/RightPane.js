import React from "react"
import GoogleAd from 'react-google-ad'

var LineChart = require("react-chartjs").Line;
var chartData = {};
var chartOptions = {};

export default class RightPane extends React.Component {

    render() {
        return (
            <div>
                <div id="console-footer" class="awin-medium">
                  <a class="pandaren" href="http://us.battle.net/wow/en/character/aerie-peak/tamen/advanced" id="card" target="_blank">
                    <div class="img">
                      <img src="http://us.battle.net/static-render/us/aerie-peak/10/124222474-avatar.jpg"/>
                    </div>
                    <span class="info">
                      <span class="name">
                        Tamen
                      </span>
                      <span class="realm">
                        Aerie Peak-US
                      </span>
                    </span>
                  </a>
                  <div id="dps">
                    <div class="inner">468306.3 DPS</div>
                  </div>
                  <LineChart data={chartData} options={chartOptions}/>
                  <div class="ad">
                    <GoogleAd client="ca-pub-0438541591834443" slot="0003037760" format="rectangle"/>
                  </div>
                </div>
                <div id="logs">
                  <section>
                    <div class="window" id="console">
                      <h3>Notices</h3>
                      <div class="inner"><div class="log items warning" id="warn"> <span class="quality-4"> Band of Crystalline Bone </span> needs an enchantment  </div> </div>
                    </div>
                  </section>
                  <section>
                    <div class="window" id="log">
                      <h3>Log</h3>
                      <div class="inner"></div>
                    </div>
                  </section>
                </div>
            </div>
        )
    }
}
