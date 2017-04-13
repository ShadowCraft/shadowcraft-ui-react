import React from 'react';
import SelectItemList from './SelectItemList';

export default class ItemSelectPopup extends React.Component {
    render() {
        return (
            <div className="alternatives popup ui-dialog visible" id="gearpopup" style={{ top: '217px', left: '617px' }}>
                <div id="filter">
                    <input className="search" placeholder="Filter..." type="search" />
                </div>
                <SelectItemList itemlist={{}} />
            </div>
        );
    }
}