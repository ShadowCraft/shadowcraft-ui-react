import React from 'react';

export default class StatPanelButton extends React.Component {
    render() {
        return (
            <button id={this.props.id} className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                <span className="ui-button-text">{this.props.name}</span>
            </button>
        );
    }
}