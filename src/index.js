import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from './Main'
import { store } from '../src/redux/redux';
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>, document.getElementById('nav'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
