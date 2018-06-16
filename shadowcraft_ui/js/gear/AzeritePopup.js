import React from 'react';
import PropTypes from 'prop-types';
import ModalWrapper from '../modals/ModalWrapper';
import Azerite from '../viewModels/Azerite';

import { connect } from 'react-redux';
import store from '../store';

import { updateCharacterState } from '../store';

class AzeritePopup extends React.Component {

    constructor(props) {
        super(props);

        let _state = {
            selected: []
        };

        this.props.data.rings.forEach(ring => _state.selected.push(ring.selected));
        this.state = _state;

        this.onRing0Change = this.onRing0Change.bind(this);
        this.onRing1Change = this.onRing1Change.bind(this);
        this.onRing2Change = this.onRing2Change.bind(this);
        this.onRing3Change = this.onRing3Change.bind(this);
        this.onApply = this.onApply.bind(this);
    }

    // TODO: i think there's a way to make event handlers take more than one argument,
    // which means we should be able to pass a ring number here and avoid duplicating
    // this method.
    onRing0Change(e) {
        let newSelected = this.state.selected.slice();
        newSelected[0] = e.currentTarget.value;
        this.setState({ selected: newSelected });
    }

    onRing1Change(e) {
        let newSelected = this.state.selected.slice();
        newSelected[1] = e.currentTarget.value;
        this.setState({ selected: newSelected });
    }
    
    onRing2Change(e) {
        let newSelected = this.state.selected.slice();
        newSelected[2] = e.currentTarget.value;
        this.setState({ selected: newSelected });
    }

    onRing3Change(e) {
        let newSelected = this.state.selected.slice();
        newSelected[3] = e.currentTarget.value;
        this.setState({ selected: newSelected });
    }

    onApply() {
        let eventData = {
            slot: this.props.slot,
            selected: this.state.selected.slice()
        };

        store.dispatch(updateCharacterState('CHANGE_AZERITE', eventData));
        store.dispatch({ type: 'CLOSE_MODAL' });
    }
    
    render() {
        /*
        let backgroundImage = 'locked';
        if (this.props.data.active == 1) {
            const filtered = this.props.data.tier1.filter(item => item.get('pos') == 0);
            if (filtered.size == 0) {
                backgroundImage = 'firstunlocked';
            }
            else {
                backgroundImage = 'firstchosen';
            }
        }
        else if (this.props.data.active == 2) {
            const filtered = this.props.data.tier2.filter(item => item.get('pos') == 0);
            if (filtered.size == 0) {
                backgroundImage = 'secondunlocked';
            }
            else {
                backgroundImage = 'secondchosen';
            }
        }
        else if (this.props.data.active == 3) {
            const filtered = this.props.data.tier3.filter(item => item.get('pos') == 0);
            if (filtered.size == 0) {
                backgroundImage = 'thirdunlocked';
            }
            else {
                backgroundImage = 'thirdchosen';
            }
        }

        return (
            <ModalWrapper style={{top: "355px", left: "440px" }} modalId="azerite">
                <div style={{backgroundImage: `url(/static/images/azerite/azeritebackground-${backgroundImage}.png)`, height: "469px", width: "476px", display: "block" }}>
                </div>
            </ModalWrapper>
        );
        */

        // TODO: state needs:
        // - zero-indexed map of rings starting from the center element
        // - each element in the map is an object containing:
        // --- a value for the currently selected spell
        // --- an array of spells that could be selected. these at least need to
        //     contain a spell ID, an icon, and a name. For future use, they should
        //     also include the cardinal position in the ring so that they can be
        //     laid out correctly if we implement a more graphical display.

        // These are numbered from the inside out, meaning the inner-most ring next to
        // the ring0 is ring 1. This leaves ring 3 as an empty array for items that
        // only have three rings.
        let ring0 = [];
        let ring1 = [];
        let ring2 = [];
        let ring3 = [];

        // TODO: this could really be an array of rings here too, but debugging is aided for
        // now by having them be separate.
        // TODO: need to add EPs for the abilities to the options
        this.props.data.rings[0].forEach(function(ring) {
            ring0.push(<option value={ring.spell} key={ring.spell}>{ring.name}</option>);
        });

        this.props.data.rings[1].forEach(function(ring) {
            ring1.push(<option value={ring.spell} key={ring.spell}>{ring.name}</option>);
        });

        this.props.data.rings[2].forEach(function(ring) {
            ring2.push(<option value={ring.spell} key={ring.spell}>{ring.name}</option>);
        });

        if (this.props.data.length > 3) {
            this.props.data.rings[3].forEach(function(ring) {
                ring3.push(<option value={ring.spell} key={ring.spell}>{ring.name}</option>);
            });

            ring3.push(<option value="0" key="0">None (0.0EP)</option>);
        }
        
        return (
                <ModalWrapper style={{top: "355px", left: "440px" }} modalId="azerite">
                <form id="azerite-rings">
                {ring3.length > 0 &&
                 <fieldset>
                 <legend>Ring 3</legend>
                 <select className="optionSelect" value={this.state.selected[3]} readOnly onChange={this.onRing3Change}>
                 {ring3}
                 </select>
                 </fieldset>
                }

                <fieldset>
                <legend>Ring 2</legend>
                <select className="optionSelect" value={this.state.selected[2]} readOnly onChange={this.onRing2Change}>
                {ring2}
                </select>
                </fieldset>

                <fieldset>
                <legend>Ring 1</legend>
                <select className="optionSelect" value={this.state.selected[1]} readOnly onChange={this.onRing1Change}>
                {ring1}
                </select>
                </fieldset>

                <fieldset>
                <legend>Center</legend>
                <select className="optionSelect" value={this.state.selected[0]} readOnly onChange={this.onRing0Change}>
                {ring0}
                </select>
                </fieldset>
                <input className="ui-button ui-widget ui-state-default ui-corner-all" role="button" value="Apply" readOnly onClick={this.onApply} />
                </form>
                <a className="close-popup ui-dialog-titlebar-close ui-corner-all" role="button" onClick={() => { store.dispatch({ type: "CLOSE_MODAL" }); }}>
                <span className="ui-icon ui-icon-closethick" />
                </a>
                </ModalWrapper>
        );
    }
}

AzeritePopup.propTypes = {
    slot: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Azerite).isRequired,
};

const mapStateToProps = function(store) {
    return {
        // TODO: need ability weights from the store
    };
};

export default connect(mapStateToProps)(AzeritePopup);
