import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import {Router, browserHistory} from 'react-router';

require('./styles/styles.scss');

ReactDOM.render(
	<Router history={browserHistory} routes={routes} />,
	document.getElementById("react-view")
);