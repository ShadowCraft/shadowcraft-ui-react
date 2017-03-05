import React from "react";

export default class DocsPane extends React.Component {
    render() {
        return (
            <div id="docs" className="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide">
                <h3>7.0 Release 2</h3>
                <ul>
                Engine Status:
                    <li>General:</li>
                    <li>Trinkets are lightly tested, may have implementation errors.</li>
                    <li>No legendaries implemented, if you get one use it, its good, if you get two, go buy lotto tickets</li>
                    <li>Set bonuses unimplemented</li>
                    <li>The outlaw model can be very slow at times, be patient if it takes a few seconds to recalculate after you make a change.</li>
                    <br />
                </ul>
                <ul>
                    <li>Assassination:</li>
                    <li>Assassination model seems to use too much energy, shouldn't have a large impact on stat weights.</li>
                    <li>T30 Talents are not implemented</li>
                    <li>Fan of Knives rotations are not implemented</li>
                    <li>Poison Knives (non-agonizing effect) is not implemented</li>
                    <br />
                </ul>
                <ul>
                    <li>Outlaw:</li>
                    <li>Model just doesn't work, don't use it.</li>
                    <br />
                </ul>
                <ul>
                    <li>Subtlety:</li>
                    <li>No combo point loss is computed, this leads to somewhat higher results than are achievable in game and decreases the value of haste.</li>
                    <li>Use finishers during dance setting doesn't behave correctly with subterfuge, leave this option enabled with subterfuge rotations.</li>
                    <li>Weaponmaster does not give bonus cps, may be somewhat undervalued</li>
                    <li>Flickering Shadows (sprint trait) not implemented</li>
                    <br />
                </ul>
                <ul>
                UI Status:
            
                    <li>Artifact data from the API is now implemented. It only supports the currently-equipped artifact, because that's all the data that Blizzard gives us. If you switch specs, your other artifact will be blank.</li>
                    <li>Most items should now be properly supported (except Mythic+ items, see below)</li>
                    <li>Selection of WF/TF item levels is now implemented for gear. Relic support is on deck.</li>
                    <li>Fixed lots and lots of bugs with relics and artifact loading in general. It should be much more robust now.</li>
                    <li>Timewalking items are not supported until Blizzard fixes the API data for them.</li>
                    <li>Trial of Valor items are not supported until they're available from the API.</li>
                </ul>
            </div>
        );
    }
}
