import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import config from './config/config';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import config from './config/config'

class Header extends Component {

	static goBackInHistory() {
		window.history.back();
	}

	static goBackToGrid() {
		const currentPath = window.location.pathname;
        window.location.href = currentPath.replace("details", "grid");
	}

	static composeAppBar(pageLocation) {
		let iconElementLeft;

		if (pageLocation === "grid") {
            iconElementLeft = <IconButton href="/grid/1/1"><IconHome/></IconButton>;
        }
        if (pageLocation === "details") {
            iconElementLeft = <IconButton onTouchTap={Header.goBackToGrid}><IconArrowBack/></IconButton>;
        }
        if (pageLocation === "settings") {
			iconElementLeft = <IconButton onTouchTap={Header.goBackInHistory}><IconArrowBack/></IconButton>;
        }

        return (
			<AppBar
				title={<span>{config.projectName}</span>}
				iconElementLeft={iconElementLeft}
				iconElementRight={<IconButton href="/settings"><IconSettings/></IconButton>}
				className="primary-color fixed-position"
			/>
		);
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={() => Header.composeAppBar("grid")}/>
					<Route path="/grid/:hierarchyId/:entityId" component={() => Header.composeAppBar("grid")}/>
					<Route path="/details/:hierarchyId/:entityId" component={() => Header.composeAppBar("details")}/>
					<Route path="/settings" component={() => Header.composeAppBar("settings")}/>
					<Route path="*" component={() => Header.composeAppBar("grid")}/>
				</Switch>
			</Router>
		);
    }
}
export default Header;
