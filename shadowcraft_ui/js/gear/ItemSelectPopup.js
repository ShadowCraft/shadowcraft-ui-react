import React from 'react';
import SelectedItemList from './SelectedItemList';

export default class ItemSelectPopup extends React.Component {
    render() {
        return (
            <div className="alternatives popup ui-dialog visible" id="gearpopup" style={{ top: '217px', left: '617px' }}>
                <div id="filter">
                    <input className="search" placeholder="Filter..." type="search" />
                </div>
                <SelectedItemList itemlist={{}} />
            </div>
        );
    }
}