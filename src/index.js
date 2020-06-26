import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Detail from './components/Customer/Detail';
import {Home} from './Home';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Detail />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
