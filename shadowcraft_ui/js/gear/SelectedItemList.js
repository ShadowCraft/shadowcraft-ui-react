import React from 'react';

export default class SelectedItemList extends React.Component {
    render() {
        console.log(this.props.itemlist);
        return this.props.itemlist.map(item => (
            <div className="body">
                <div
                    className="slot"
                    data-bonus="3518"
                    data-context=""
                    data-identifier="140889:905"
                    data-name="Bracers of Impossible Choices"
                    data-quality="4"
                    data-search="Bracers%20of%20Impossible%20Choices%20undefined"
                    data-slot=""
                    data-tag=""
                    data-upgrade=""
                    id="140889"
                >
                    <div className="image">  <img src="http://us.media.blizzard.com/wow/icons/56/inv_leather_raidroguemythic_q_01bracer.jpg" />
                        <span className="ilvl" />
                    </div>
                    <div
                        className="name quality-4 tt"
                        data-tooltip-bonus="3518"
                        data-tooltip-gems=""
                        data-tooltip-id="140889"
                        data-tooltip-spec=""
                        data-tooltip-upgd=""
                    >
                        <em className="ilvl">(905)</em>  Bracers of Impossible Choices  <em className="heroic" />  <a className="wowhead" href="http://legion.wowhead.com/item=140889" target="_blank">Wowhead</a>
                    </div>
                    <div className="gems" />
                    <span className="tags"> Mythic</span>
                    <span className="desc"> 2076.8 base   </span>
                    <span className="pct"><div className="label">2076.8</div><div className="pct-inner" style={{ width: '100%' }} /></span></div>
            </div>
        ));
    }
}