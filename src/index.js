import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import GridView from './GridView/GridView';
import DetailView from './DetailView/DetailView';
import EventTypesView from './EventTypesView/EventTypesView';
import NotFound from "./Utils/NotFound";

ReactDOM.render(
	<Router>
		<App>
			<Switch>
				<Route exact path="/" component={GridView}/>
				<Route path="/grid/:entityId" component={GridView}/>
				<Route path="/details/:parentId/:entityId" component={DetailView}/>
			<Route path="/eventtypes" component={EventTypesView}/>
				<Route path="*" component={NotFound}/>
			</Switch>
		</App>
	</Router>,
	document.getElementById('root')
);