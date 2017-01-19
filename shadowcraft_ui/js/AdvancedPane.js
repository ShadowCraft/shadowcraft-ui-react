import React from "react"

export default class AdvancedPane extends React.Component {
    render() {
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="advanced">
                <div className="panel-tools">
                    <section id="dpsbreakdown">
                        <h3>DPS Breakdown</h3>
                        <div className="inner">
                            <div className="talent_contribution" data-val="100.01" id="talent-weight-rupture_ticks">
                                <div className="name">Rupture Ticks (93539.4 DPS)</div>
                                <div className="pct">
                                    <div className="label">37.23%</div>
                                    <div className="pct-inner" style={{ width: '100.01%' }}></div>
                                </div>
                            </div>
                            <div className="talent_contribution" data-val="53.943153004008984" id="talent-weight-mutilate">
                                <div className="name">Mutilate (50448.8 DPS)</div>
                                <div className="pct">
                                    <div className="label">20.08%</div>
                                    <div className="pct-inner" style={{ width: '53.9432%' }}></div>
                                </div>
                            </div>
                            <div className="talent_contribution" data-val="25.61297164054714" id="talent-weight-envenom">
                                <div className="name">Envenom (23948.9 DPS)</div>
                                <div className="pct">
                                    <div className="label">9.53%</div>
                                    <div className="pct-inner" style={{ width: '25.613%' }}></div>
                                </div>
                            </div>
                            <div className="talent_contribution" data-val="23.175935480603673" id="talent-weight-autoattack">
                                <div className="name">Autoattack (21669.3 DPS)</div>
                                <div className="pct">
                                    <div className="label">8.63%</div>
                                    <div className="pct-inner" style={{ width: '23.1759%' }}></div>
                                </div>
                            </div>
                            <div className="talent_contribution" data-val="22.60549010386171" id="talent-weight-poison_bomb">
                                <div className="name">Poison Bomb (21135.7 DPS)</div>
                                <div className="pct">
                                    <div className="label">8.41%</div>
                                    <div className="pct-inner" style={{ width: '22.6055%' }}></div>
                                </div>
                            </div>
                            <div className="talent_contribution" data-val="22.040670417936077" id="talent-weight-garrote_ticks">
                                <div className="name">Garrote Ticks (20607.4 DPS)</div>
                                <div className="pct">
                                    <div className="label">8.20%</div>
                                    <div className="pct-inner" style={{ width: '22.0407%' }}></div>
                                </div>
                            </div>
                            <div className="talent_contribution" data-val="11.433310587077962" id="talent-weight-from_the_shadows">
                                <div className="name">From The Shadows (10685.3 DPS)</div>
                                <div className="pct">
                                    <div className="label">4.25%</div>
                                    <div className="pct-inner" style={{ width: '11.4333%' }}></div>
                                </div>
                            </div>
                            <div className="talent_contribution" data-val="5.208262656040939" id="talent-weight-kingsbane_ticks">
                                <div className="name">Kingsbane Ticks (4862.4 DPS)</div>
                                <div className="pct">
                                    <div className="label">1.94%</div>
                                    <div className="pct-inner" style={{ width: '5.20826%' }}></div>
                                </div>
                            </div>
                            <div className="talent_contribution" data-val="3.907400181058212" id="talent-weight-kingsbane">
                                <div className="name">Kingsbane (3645.6 DPS)</div>
                                <div className="pct">
                                    <div className="label">1.45%</div>
                                    <div className="pct-inner" style={{ width: '3.9074%' }}></div>
                                </div>
                            </div>
                            <div className="talent_contribution" data-val="0.7412844561853807" id="talent-weight-Infested_Ground">
                                <div className="name">Infested Ground (684.0 DPS)</div>
                                <div className="pct">
                                    <div className="label">0.27%</div>
                                    <div className="pct-inner" style={{ width: '0.741284%' }}></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="engineinfo">
                        <h3>Engine Info</h3>
                        <div className="inner">
                            <div className="stat"> <span className="key">Shadowcraft Build</span> <span className="val">0.02</span> </div>
                            <div className="stat"> <span className="key">Wow Build Target</span> <span className="val">7.0.0</span> </div>
                        </div>
                    </section>
                </div>
                <div className="panel-content"></div>
            </div>
        )
    }
}
