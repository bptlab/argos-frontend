import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import GridView from './GridView/GridView';
import DetailView from './DetailView/DetailView';
import EventTypesView from './EventTypesView/EventTypesView';
import './definitions.css';
import './index.css';

ReactDOM.render(
	<Router>
		<App>
			<Route path="/grid/:entityId" component={GridView}/>
			<Route path="/details" component={DetailView}/>
			<Route path="/eventtypes" component={EventTypesView}/>
		</App>
	</Router>,
	document.getElementById('root')
);