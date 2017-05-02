import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import GridView from './GridView/GridView';
import DetailView from './DetailView/DetailView';
import EventTypesView from './EventTypesView/EventTypesView';

ReactDOM.render(
	<Router>
		<App>
			<Route exact path="/" render={() => {
				return (<Redirect to="/grid/-1"/>);
			}} />
			<Route path="/grid/:entityId" component={GridView}/>
			<Route path="/details" component={DetailView}/>
			<Route path="/eventtypes" component={EventTypesView}/>
		</App>
	</Router>,
	document.getElementById('root')
);