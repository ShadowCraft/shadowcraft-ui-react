import CharacterPane from './CharacterPane';
import CharacterInput from './CharacterInput';
//import MainPanel from './MainPanel'
//import Hello from './Hello'

import React from 'react';
import ReactDOM from 'react-dom';

import screen_style from '../css/screen.css.sass';

// characterJson is being rendered on the page by flask

// disabled for now since CharacterInput doesn't seem to display right now.

// characterJson incredibly hacky, but it gets us character data to flesh out the rest of the app
if (characterJson === undefined)
    ReactDOM.render(<CharacterInput />, document.getElementById('appjs'));
else
    ReactDOM.render(<CharacterPane data={characterJson} />, document.getElementById('appjs'));