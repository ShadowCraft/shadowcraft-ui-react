import React from 'react';
import PropTypes from 'prop-types';

class StatPanelElement extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        return (
            <div className="stat"> <span className="key">{this.props.name}</span> <span className="val">{this.props.value}</span> </div>
        );
    }
}

StatPanelElement.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default StatPanelElement;
