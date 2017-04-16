import React from 'react';
import ItemSelectElement from './ItemSelectElement';

export default class ItemSelectPopup extends React.Component {

    render() {
        // console.log(this.props.items);
        //TODO: fix the popup dialog placement
        return (
            <div className="alternatives popup ui-dialog visible" id="gearpopup" style={{ top: '0px', left: '0px' }}>
                <div id="filter">
                    <input className="search" placeholder="Filter..." type="search" />
                </div>
                <div className="body" >
                    {this.props.items ? this.props.items.map((item, index) => (<ItemSelectElement key={index} item={item} />)) : <div />}
                </div>
            </div>
        );
    }
}