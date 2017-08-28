import React from 'react';
import PropTypes from 'prop-types';

class StatPanelButton extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        return (
            <button
                id={this.props.id}
                className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                role="button"
                aria-disabled="false"
                onClick={this.props.onClick}
            >
                <span className="ui-button-text">{this.props.name}</span>
            </button>
        );
    }
}

StatPanelButton.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default StatPanelButton;
