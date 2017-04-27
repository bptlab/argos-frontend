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

	static goBackInHistory() {
		window.history.back();
	}

	static composeAppBar(pageLocation) {
		let iconElementLeft;

		if (pageLocation === "grid") {
            iconElementLeft = <IconButton href="/"><IconHome/></IconButton>;
        }
        if (pageLocation === "details") {
            iconElementLeft = <IconButton onTouchTap={Header.goBackInHistory}><IconArrowBack/></IconButton>;
        }
        if (pageLocation === "settings") {
			iconElementLeft = <IconButton onTouchTap={Header.goBackInHistory}><IconArrowBack/></IconButton>;
        }

        return (
			<AppBar
				title={<span>{config.projectName}</span>}
				iconElementLeft={iconElementLeft}
				iconElementRight={<IconButton><IconSettings/></IconButton>}
				className="primary-color fixed-position"
			/>
		);
	}

	render() {
		return (
			<Router>
				<div>
					<Route path="/" component={() => Header.composeAppBar("grid")}/>
					<Route path="/grid/:entityId" component={() => Header.composeAppBar("grid")}/>
					<Route path="/details" component={() => Header.composeAppBar("details")}/>
					<Route path="/settings" component={() => Header.composeAppBar("settings")}/>
				</div>
			</Router>
		);
    }
}
export default Header;
