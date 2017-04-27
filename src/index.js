import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import GridView from './GridView/GridView';
import DetailView from './DetailView/DetailView';
import SettingsView from './SettingsView/SettingsView';
import './definitions.css';
import './index.css';
import NotFound from "./Utils/NotFound";

ReactDOM.render(
	<Router>
		<App>
			<Switch>
    			<Route exact path="/" render={() => {
    				return (<Redirect to="/grid/-1"/>);
    			}} />
				<Route path="/grid/:hierarchyId/:entityId" component={GridView}/>
				<Route path="/details/:hierarchyId/:entityId" component={DetailView}/>
			    <Route path="/eventtypes" component={EventTypesView}/>
				<Route path="*" component={NotFound}/>
			</Switch>
		</App>
	</Router>,
	document.getElementById('root')
);