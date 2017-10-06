import dotProp from 'dot-prop-immutable';
import deepEqual from 'deep-equal';
import Immutable from 'immutable';

export const initialWarningsState = {
    warnings: []
};

export const warningsActionTypes = {
    CLEAR_WARNINGS: 'CLEAR_WARNINGS',
    ADD_WARNING: 'ADD_WARNING',
    ADD_MULTIPLE_WARNINGS: 'ADD_MULTIPLE_WARNINGS'
};

export const warningsReducer = function (state = initialWarningsState, action) {
    
    state = Immutable.fromJS(state);
    
    switch (action.type) {
        case warningsActionTypes.CLEAR_WARNINGS:
            console.log('CLEAR_WARNINGS');
            return state.set('warnings', []).toJS();

        case warningsActionTypes.ADD_WARNING: {

            console.log('ADD_WARNING');
            const warningSeq = state.get('warnings').toSeq();
            const warnings = warningSeq.filter(function(obj) {
                return obj.component != action.component;
            }).toList();
            warnings.push({component: action.component, text: action.text});

            return state.set('warnings', warnings).toJS();
        }

        case warningsActionTypes.ADD_MULTIPLE_WARNINGS: {

            console.log('ADD_MULTIPLE');
            const warnings = state.get('warnings');
            /* const warningSeq = state.get('warnings').toSeq();
             * const warnings = warningSeq.filter(function(obj) {
             *     return obj.component != action.component;
             * }).toList();

             * for (let idx in action.warnings) {
             *     warnings.push({component: action.component,
             *                    text: action.warnings[idx]});
             * }
             */
            return state.set('warnings', warnings).toJS();
        }
    }

    return state;
};
