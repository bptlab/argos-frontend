import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import GridView from './GridView/GridView';
import DetailView from './DetailView/DetailView';
import SettingsView from './SettingsView/SettingsView';
import './index.css';

ReactDOM.render(
	<Router>
		<Route path="/" component={App}>
			<Route path="/grid" component={GridView}/>
			<Route path="/details" component={DetailView}/>
			<Route path="/settings" component={SettingsView}/>
		</Route>
	</Router>,
	document.getElementById('root')
);