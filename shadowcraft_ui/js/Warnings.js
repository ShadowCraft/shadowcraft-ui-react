import React from "react";
import PropTypes from 'prop-types';
import Gear from './viewModels/Gear';
import { List } from 'immutable';
import { connect } from 'react-redux';
import store from './store';

class Warnings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let newWarnings = [];

        this.props.gear.keySeq().forEach(slot => {
            let item = this.props.gear.get(slot);
            if (slot == "neck" || slot == "finger1" || slot == "finger2" || slot == "back") {
                if (item.get('enchant') == 0) {
                    let quality = `quality-${item.get('quality')}`;
                    newWarnings.push(<div><span key={`${item.get('name')}enchant`} className={quality}>{item.get('name')}</span> is missing an enchant</div>);
                }
            }

            let missingGem = false;
            if (item.get('socket_count') > 0) {
                item.get('gems').valueSeq().forEach(function (gem) {
                    if (gem.get('id') == 0) {
                        missingGem = true;
                    }
                });
            }

            if (missingGem) {
                let quality = `quality-${item.get('quality')}`;
                newWarnings.push(<div><span key={`${item.get('name')}gem`} className={quality}>{item.get('name')}</span> is missing one or more gems</div>);
            }
        });

        let warnings = newWarnings.map((g, i) =>
            <div className="log warning" key={i}>{g}</div>);

        return (
            <div className="inner">
                {warnings}
            </div>
        );
    }
}

Warnings.propTypes = {
    gear: PropTypes.instanceOf(Gear).isRequired
};

const mapStateToProps = function (store) {
    return {
        gear: store.character.get('gear')
    };
};

export default connect(mapStateToProps)(Warnings);
