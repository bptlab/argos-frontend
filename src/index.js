import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import GridView from './GridView/GridView';
import DetailView from './DetailView/DetailView';
import SettingsView from './SettingsView/SettingsView';
import NotFound from "./Utils/NotFound";
import NewEventTypeView from "./CreateEventTypeView/CreateEventTypeView";
import CreateEventQueryView from "./CreateEventQueryView/CreateEventQueryView";

ReactDOM.render(
	<Router>
		<App>
			<Switch>
				<Route exact path="/" render={() => {
					return (<Redirect to="/grid/-1"/>);
				}} />
				<Route path="/grid/:entityId" component={GridView}/>
				<Route path="/details/:parentId/:entityId" component={DetailView}/>
			    <Route exact path="/settings" component={SettingsView}/>
				<Route path="/settings/eventType/:eventTypeId/eventQuery/create" component={CreateEventQueryView}/>
				<Route path="/create/eventType" component={NewEventTypeView}/>
				<Route path="*" component={NotFound}/>
			</Switch>
		</App>
	</Router>,
	document.getElementById('root')
);