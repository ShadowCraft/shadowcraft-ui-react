import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Gear from './viewModels/Gear';
import store from './store';
import { ITEM_DATA } from './item_data';

class Warnings extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let warnings = [];
        let keyIndex = 0;

        this.props.gear.keySeq().forEach(slot => {
            let item = this.props.gear.get(slot);

            let dbItems = ITEM_DATA.filter(function(dbItem) {
                return item.id == dbItem.id;
            });

            if (dbItems.length == 0) {
                let quality = `quality-${item.get('quality')}`;
                warnings.push(<div className="log warning" key={keyIndex}><span key={`${item.get('name')}enchant`} className={quality}>{item.get('name')}</span> is not in the database, and may not function as expected. Please notify the Shadowcraft devs!</div>);
                keyIndex = keyIndex + 1;
            }

            if (slot == "neck" || slot == "finger1" || slot == "finger2" || slot == "back") {
                if (item.get('enchant') == 0) {
                    let quality = `quality-${item.get('quality')}`;
                    warnings.push(<div className="log warning" key={keyIndex}><span key={`${item.get('name')}enchant`} className={quality}>{item.get('name')}</span> is missing an enchant</div>);
                    keyIndex = keyIndex + 1;
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
                warnings.push(<div className="log warning" key={keyIndex}><span key={`${item.get('name')}gem`} className={quality}>{item.get('name')}</span> is missing one or more gems</div>);
                keyIndex = keyIndex + 1;
            }
        });

        if (this.props.engineWarning.length > 0) {
            warnings.push(<div className="log warning" key={keyIndex}>{this.props.engineWarning}</div>);
        }

        return (
            <div className="inner">
                {warnings}
            </div>
        );
    }
}

Warnings.propTypes = {
    gear: PropTypes.instanceOf(Gear).isRequired,
    engineWarning: PropTypes.string.isRequired
};

const mapStateToProps = function (store) {
    return {
        gear: store.character.get('gear'),
        engineWarning: store.warnings.get('engineWarning')
    };
};

export default connect(mapStateToProps)(Warnings);
