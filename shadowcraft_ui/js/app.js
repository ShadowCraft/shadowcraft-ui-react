import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import CharacterPane from './CharacterPane';
import CharacterInput from './CharacterInput';
import screen_style from '../css/screen.sass';

const FourOhFour = () => (
    <div id='notfound'>
        <div className='content'>
            <h1>Document not found</h1>
            <p>Please check your URL and try again.</p>
        </div>
    </div>
);

// I'd love to move the provider wrapper out of here but because the CharacterPane is a connected
// component, the Provider has to wrap it first.
ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={CharacterInput} />
            <Route path="/:region(us|eu|kr|tw|cn|sea)/:realm/:name/:sha" render={(props) => <Provider store={store}><CharacterPane pathinfo={props.match.params} /></Provider>} />
            <Route path="/:region(us|eu|kr|tw|cn|sea)/:realm/:name" render={(props) => <Provider store={store}><CharacterPane pathinfo={props.match.params} /></Provider>} />
            <Route component={FourOhFour} />
        </Switch>
    </Router>,
    document.getElementById('appjs')
);
