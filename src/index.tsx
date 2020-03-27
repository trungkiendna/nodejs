import './style.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './react-redux/App';
import {Router} from 'react-router-dom';
import {history} from './react-redux/store';

ReactDOM.render((
    <Router history={history}>
        <App/>
    </Router>
 ),document.getElementById('root')
)