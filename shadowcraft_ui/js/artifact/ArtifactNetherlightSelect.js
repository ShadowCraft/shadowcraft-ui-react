import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../store';
import { updateCharacterState } from '../store';
import { netherlight_traits } from './ArtifactLayouts';

class ArtifactNetherlightSelect extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.handleTier2Change = this.handleTier2Change.bind(this);
        this.handleTier3Change = this.handleTier3Change.bind(this);
    }

    handleTier2Change(e) {
        e.preventDefault();
        store.dispatch(updateCharacterState("UPDATE_NETHERLIGHT",
                                            {slot: this.props.index,
                                             tier2: parseInt(e.target.value),
                                             tier3: this.props.netherlightRelic.tier3}));
    }

    handleTier3Change(e) {
        e.preventDefault();
        store.dispatch(updateCharacterState("UPDATE_NETHERLIGHT",
                                            {slot: this.props.index,
                                             tier2: this.props.netherlightRelic.tier2,
                                             tier3: parseInt(e.target.value)}));
    }

    render() {

        var relics = this.props.relics.map(function (relic) {
            return <option key={relic[0]} id={`nlTier3-${this.props.index}-${relic[0]}`} value={relic[0]}>{relic[1]}</option>;
        }.bind(this));

        var nlTraits = netherlight_traits.map(function(trait) {
            return <option key={trait['id']} id={`nlTier3-${this.props.index}-${trait['id']}`} value={trait['id']}>{trait['name']}</option>;
        }.bind(this));

        return (
            <label className="select">
                <span className="label">Relic {parseInt(this.props.index) + 1}:</span>
                <span className="select-container">
                    <select
                        className="optionSelect"
                        id={'relic-' + this.props.index + '-select'}
                        data-index={this.props.index}
                        value={this.props.netherlightRelic.tier2}
                        onChange={this.handleTier2Change}
                    >
                        <option id={`nlTier2-${this.props.index}-none`} value="0">None</option>
                        {nlTraits}
                    </select>
                </span>
                <span className="select-container">
                    <select
                        className="optionSelect"
                        id={'relic-' + this.props.index + '-select'}
                        data-index={this.props.index}
                        value={this.props.netherlightRelic.tier3}
                        onChange={this.handleTier3Change}
                    >
                        <option id={`nlTier3-${this.props.index}-none`} value="0">None</option>
                        {relics}
                    </select>
                </span>
            </label>
        );
    }
}

ArtifactNetherlightSelect.propTypes = {
    index: PropTypes.string.isRequired,
    relics: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
    netherlightRelic: PropTypes.shape({
        tier2: PropTypes.number.isRequired,
        tier3: PropTypes.number.isRequired
    }).isRequired
};

const mapStateToProps = function (store, ownProps) {
    return {
        netherlightRelic: store.character.artifact.netherlight[ownProps.index]
    };
};

export default connect(mapStateToProps)(ArtifactNetherlightSelect);
