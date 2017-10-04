import React from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { changeRelic } from '../store';

class ArtifactRelicSelect extends React.Component {

    constructor(props) {
        super(props);
        this.handleRelicChange = this.handleRelicChange.bind(this);
        this.handleIlvlChange = this.handleIlvlChange.bind(this);

        // should only need to run these once when created
        let ilvls = [];
        for (var i = 835; i <= 955; i += 5) {
            ilvls.push(<option key={i} value={i}>{i}</option>);
        }
        this.relicIlvlSelectionList = ilvls;

        this.relicTypeSelectionList = this.props.relics.map(
            relic => <option key={relic[0]} value={relic[0]}>{relic[1]}</option>
        );

    }

    handleRelicChange(e) {
        e.preventDefault();
        store.dispatch(
            changeRelic(
                this.props.index,
                parseInt(e.target.value),
                this.props.selected.ilvl
            ));
    }

    handleIlvlChange(e) {
        e.preventDefault();
        store.dispatch(
            changeRelic(
                this.props.index,
                this.props.selected.id,
                parseInt(e.target.value)
            ));
    }

    render() {
        return (
            <label className="select">
                <span className="label">Relic {parseInt(this.props.index) + 1} ({this.props.type}):</span>
                <span className="select-container">
                    <select
                        className="optionSelect"
                        key={this.props.selected.ilvl}
                        value={this.props.selected.id}
                        onChange={this.handleRelicChange}
                    >
                        <option value="0">None</option>
                        {this.relicTypeSelectionList}
                    </select>
                </span>
                <span className="select-container">
                    <select
                        className="optionSelect"
                        key={this.props.selected.id}
                        value={this.props.selected.ilvl}
                        onChange={this.handleIlvlChange}
                        disabled={this.props.selected.id === 0}
                    >
                        {this.relicIlvlSelectionList}
                    </select>
                </span>
            </label>
        );
    }
}

ArtifactRelicSelect.propTypes = {
    selected: PropTypes.shape({
        id: PropTypes.number.isRequired,
        ilvl: PropTypes.number.isRequired
    }).isRequired,
    index: PropTypes.string.isRequired,
    relics: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
    type: PropTypes.string.isRequired
};

export default ArtifactRelicSelect;