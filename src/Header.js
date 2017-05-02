import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconHome from 'material-ui/svg-icons/action/home';
import IconSettings from 'material-ui/svg-icons/action/settings';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import config from './config/config';
import { css } from 'aphrodite';
import AppStyles from './AppStyles';

class Header extends Component {

	static goBackInHistory() {
		window.history.back();
	}

	static goBackToGrid() {
		const currentPath = window.location.pathname;
        const newPath = currentPath.replace("details", "grid");
        window.location.href = newPath.substring(0, newPath.lastIndexOf("/") + 1);
    }

	static composeAppBar(pageLocation) {
		let iconElementLeft;
		let statusBorder;

		if (pageLocation === "grid") {
            iconElementLeft = <IconButton href="/grid/-1"><IconHome/></IconButton>;
        }
        if (pageLocation === "details") {
            iconElementLeft = <IconButton onTouchTap={Header.goBackToGrid}><IconArrowBack/></IconButton>;
            statusBorder = AppStyles.borderBottomStatusFirst;
        }
        if (pageLocation === "settings") {
			iconElementLeft = <IconButton onTouchTap={Header.goBackInHistory}><IconArrowBack/></IconButton>;
        }

        return (
			<AppBar
				title={<span>{config.projectName}</span>}
				iconElementLeft={iconElementLeft}
				iconElementRight={<IconButton href="/settings"><IconSettings/></IconButton>}
				className={css(statusBorder)}
			/>
		);
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={() => Header.composeAppBar("grid")}/>
					<Route path="/grid/:entityId" component={() => Header.composeAppBar("grid")}/>
					<Route path="/details/:parentId/:entityId" component={() => Header.composeAppBar("details")}/>
					<Route path="/settings" component={() => Header.composeAppBar("settings")}/>
					<Route path="*" component={() => Header.composeAppBar("grid")}/>
				</Switch>
			</Router>
		);
    }
}
export default Header;
