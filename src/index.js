import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import GridView from './GridView/GridView';
import DetailView from './DetailView/DetailView';
import SettingsView from './SettingsView/SettingsView';
import NotFound from "./Utils/NotFound";
import config from './config/config';

import "intro.js/minified/introjs.min.css";

import CreateEventQueryView from "./CreateEventQueryView/CreateEventQueryView";
import CreateEntityMappingView from "./CreateEntityMappingView/CreateEntityMappingView";
import CreateEventTypeView from "./CreateEventTypeView/CreateEventTypeView";
import AnalyticsView from "./AnalyticsView/AnalyticsView";

ReactDOM.render(
	<Router basename={config.basename}>
		<App>
			<Switch>
				<Route exact path="/" render={() => {
					return (<Redirect to="/grid/-1"/>);
				}} />
				<Route path="/grid/:entityId" component={GridView}/>
				<Route path="/details/:parentId/:entityId" component={DetailView}/>
				<Route path="/analytics" component={AnalyticsView} />
				<Route exact path="/settings" component={SettingsView}/>
				<Route exact path="/settings/eventType/:eventTypeId/eventQuery/create" component={CreateEventQueryView}/>
				<Route exact path="/settings/eventType/:eventTypeId/eventQuery/:eventQueryId/edit" component={CreateEventQueryView}/>
				<Route exact path="/settings/entityMapping/:eventTypeId/create" component={CreateEntityMappingView}/>
				<Route path="/settings/entityMapping/:entityMappingId/edit" component={CreateEntityMappingView}/>
				<Route path="/settings/eventType/create" component={CreateEventTypeView}/>
				<Route path="*" component={NotFound}/>
			</Switch>
		</App>
	</Router>,
	document.getElementById('root')
);