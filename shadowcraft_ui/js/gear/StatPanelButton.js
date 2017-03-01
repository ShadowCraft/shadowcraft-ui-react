import React from 'react';

export default class StatPanelButton extends React.Component {
    constructor() {
        super();
        // hack together a style replacement for jquery-ui
        // this.style = {
        //     border: '1px solid #444444',
        //     background: '#222222',
        //     fontWeight: 'normal',
        //     color: '#eeeeee',
        //     fontSize: '1em',
        //     width: '100%',
        //     fontFamily: 'Verdana, Arial, sans-serif',
        //     display: 'inline-block',
        //     position: 'relative',
        //     padding: '0',
        //     marginRight: '.1em',
        //     textDecoration: 'none !important',
        //     cursor: 'pointer',
        //     textAlign: 'center',
        //     zoom: '1',
        //     overflow: 'visible',
        //     borderRadius: '2px'

        // };
    }
    render() {
        return (
            <button id={this.props.id} className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                <span className="ui-button-text">{this.props.name}</span>
            </button>
        );
    }
}