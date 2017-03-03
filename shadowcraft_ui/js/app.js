import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import CharacterPane from './CharacterPane';
import CharacterInput from './CharacterInput';
import screen_style from '../css/screen.css.sass';

var frame;
if (characterJson) {
    frame = <CharacterPane data={characterJson} />;
} else {
    frame = <CharacterInput />;
}

ReactDOM.render(
    <Provider store={store}>{frame}</Provider>,
    document.getElementById('appjs')
);
