import React from 'react';
import PropTypes from 'prop-types';

class BonusIDCheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.handleCheckbox(e);
    }

    render() {
        let description;
        switch (this.props.bonusId.toString()) {
            case "1808":
                description = "1 Socket";
        }

        let classes = "";
        if (this.props.checked) {
            classes = "label_check c_on";
        } else {
            classes = "label_check";
        }

        return (
            <label className={classes}>
                <input key={this.props.bonusId} id={"bonus-" + this.props.bonusId} data-bonusid={this.props.bonusId} type="checkbox" onChange={this.onChange} checked={this.props.checked} />{description}
            </label>
        );
    }
}

BonusIDCheckBox.propTypes = {
    bonusId: PropTypes.string.isRequired,
    handleCheckbox: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired
};

export default BonusIDCheckBox;
