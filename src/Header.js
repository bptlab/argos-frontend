import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import config from './config/config';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import config from './config/config'

class Header extends Component {

	composeAppBar(pageLocation) {
		let iconElementLeft;

		if (pageLocation === "grid") {
            iconElementLeft = <IconButton><IconHome/></IconButton>;
        }
        if (pageLocation === "details") {
            iconElementLeft = <IconButton><IconArrowBack/></IconButton>;
        }
        if (pageLocation === "settings") {
			iconElementLeft = <IconButton><IconArrowBack/></IconButton>;
        }

        return (
			<AppBar
				title={<span>{config.projectName}</span>}
				iconElementLeft={iconElementLeft}
				iconElementRight={<IconButton><IconSettings/></IconButton>}
				className="primary-color"
			/>
		);
	}

	render() {
		return (
			<Router>
				<div>
					<Route path="/grid/:entityId" component={() => this.composeAppBar("grid")}/>
					<Route path="/details" component={() => this.composeAppBar("details")}/>
					<Route path="/settings" component={() => this.composeAppBar("settings")}/>
				</div>
			</Router>
		);
    }
}
export default Header;
