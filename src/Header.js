import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconHome from "material-ui/svg-icons/action/home";
import IconSettings from "material-ui/svg-icons/action/settings";
import IconHelpInactive from "material-ui/svg-icons/action/help-outline";
import IconHelp from "material-ui/svg-icons/action/help";
import IconAdd from 'material-ui/svg-icons/content/add';
import IconArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {css, StyleSheet} from "aphrodite";
import AppStyles from "./AppStyles";
import Utils from "./Utils/Utils";
const introJs = require('intro.js/minified/intro.min.js');

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hintsVisible: false
		};
	}

	static goBackInHistory() {
		window.history.back();
	}

	static goBackToGrid() {
		const currentPath = window.location.pathname;
		const newPath = currentPath.replace("details", "grid");
		window.location.href = newPath.substring(0, newPath.lastIndexOf("/") + 1);
	}

	toggleHintsOnPage() {
		const hintsCurrentlyVisible = this.state.hintsVisible;
		if (hintsCurrentlyVisible) {
			introJs.introJs().hideHints();
		}
		else {
			introJs.introJs().showHints();
			window.dispatchEvent(new Event('resize'));
		}
		this.setState({
			hintsVisible: !hintsCurrentlyVisible
		});
	}

	showHelpButton() {
		let hintButton = <IconHelpInactive/>;
		if (this.state.hintsVisible) {
			hintButton = <IconHelp/>;
		}
		return (
			<IconButton onTouchTap={() => this.toggleHintsOnPage()}>{hintButton}</IconButton>
		);
	}

	composeAppBar(pageLocation) {
		let iconElementLeft = <IconButton onTouchTap={Header.goBackInHistory}><IconArrowBack/></IconButton>;
		let iconElementRight = <IconButton href="/settings"><IconSettings/></IconButton>;

		if (pageLocation === "grid") {
			iconElementLeft = <IconButton href="/grid/-1"><IconHome/></IconButton>;
		}

		if (pageLocation === "details") {
			iconElementLeft = <IconButton onTouchTap={Header.goBackToGrid}><IconArrowBack/></IconButton>;
		}

		if (pageLocation === "settings") {
			iconElementRight = <IconButton href="settings/eventType/create"><IconAdd/></IconButton>;
		}

		//all pages for creation of eventqueries, eventtypes and mappings
		if (pageLocation === "create") {
			iconElementRight = <div/>;
		}

		let appBarStyle = "";
		if(this.props.status) {
			const statusColor = StyleSheet.create({
				color: {
					borderColor: Utils.getColorForStatus(this.props.status)
				}
			});
			appBarStyle = css(AppStyles.headerBorderDetail, statusColor.color);
		}

		iconElementRight = <div>{this.showHelpButton()}{iconElementRight}</div>;

		return (
			<AppBar
				title={<span>{this.props.title}</span>}
				iconElementLeft={iconElementLeft}
				iconElementRight={iconElementRight}
				className={appBarStyle}
			/>
		);
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={() => this.composeAppBar("grid")}/>
					<Route path="/grid/:entityId" component={() => this.composeAppBar("grid")}/>
					<Route path="/details/:parentId/:entityId" component={() => this.composeAppBar("details")}/>
					<Route exact path="/settings" component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/eventType/create" component={() => this.composeAppBar("create")}/>
					<Route path="/settings/eventType/:eventTypeId/eventQuery/create" component={() => this.composeAppBar("create")}/>
					<Route path="/settings/eventType/:eventTypeId/eventQuery/:eventQueryId/edit" component={() => this.composeAppBar("create")}/>
					<Route path="/settings/entityMapping/create" component={() => this.composeAppBar("create")}/>
					<Route path="*" component={() => this.composeAppBar("grid")}/>
				</Switch>
			</Router>
		);
	}
}

export default Header;