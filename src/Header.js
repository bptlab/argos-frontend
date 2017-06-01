import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconHome from "material-ui/svg-icons/action/home";
import IconSettings from "material-ui/svg-icons/action/settings";
import IconHelpInactive from "material-ui/svg-icons/action/help-outline";
import IconHelp from "material-ui/svg-icons/action/help";
import IconArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {css, StyleSheet} from "aphrodite";
import AppStyles from "./AppStyles";
import Utils from "./Utils/Utils";
import Notification from "./Utils/Notification"
import config from "./config/config";
const introJs = require('intro.js/minified/intro.min.js');

class Header extends Component {
	static lastNotificationTimestamp;

	constructor(props) {
		super(props);
		this.state = {
			hintsVisible: false
		};
		Header.lastNotificationTimestamp = new Date();
		this.handleTriggeredNotification = this.handleTriggeredNotification.bind(this);
		window.addEventListener('notificationTriggered', this.handleTriggeredNotification, false);
	}

	shouldComponentUpdate(nextProps) {
		if (window.sessionStorage.getItem('notificationMessage')) {
			if (nextProps.title === this.props.title &&
				JSON.parse(window.sessionStorage.getItem('notificationMessage')).timestamp === Header.lastNotificationTimestamp) {
				return false
			}
			Header.lastNotificationTimestamp = JSON.parse(window.sessionStorage.getItem('notificationMessage')).timestamp;
		} else if (nextProps.title === this.props.title) {
			return false
		}
		return true;
	}

	static goBackInHistory() {
		window.history.back();
	}

	static goBackToGrid() {
		const currentPath = window.location.pathname;
		const newPath = currentPath.replace("details", "grid");
		window.location.href = newPath.substring(0, newPath.lastIndexOf("/") + 1);
	}

	handleTriggeredNotification() {
		this.forceUpdate();
	}

	toggleHintsOnPage() {
		const hintsCurrentlyVisible = this.state.hintsVisible;
		if (hintsCurrentlyVisible) {
			introJs.introJs().hideHints();
		}
		else {
			introJs.introJs().showHints();
			introJs.introJs().addHints();
		}
		this.setState({
			hintsVisible: !hintsCurrentlyVisible
		});
	}

	getHelpButton() {
		let hintButton = <IconHelpInactive/>;
		let buttonTooltip = "Show help bullets on page";
		if (this.state.hintsVisible) {
			hintButton = <IconHelp/>;
			buttonTooltip = "Hide help bullets on page";
		}
		return (
			<IconButton
				tooltip={buttonTooltip}
				onTouchTap={() => this.toggleHintsOnPage()}>
				{hintButton}
			</IconButton>
		);
	}

	getNotificationMessage() {
		if(window.sessionStorage.getItem('notificationMessage')) {
			const storageNotificationMessage = window.sessionStorage.getItem('notificationMessage');
			if (storageNotificationMessage && window.location.href.toString() === JSON.parse(storageNotificationMessage).targetPage.toString()) {
				return JSON.parse(storageNotificationMessage);
			}
		}
	}

	composeAppBar(pageLocation) {
		let iconElementLeft = <IconButton onTouchTap={Header.goBackInHistory}><IconArrowBack/></IconButton>;
		let iconElementRight = <IconButton href={Utils.getLink('/settings')}><IconSettings/></IconButton>;

		if (pageLocation === "grid") {
			iconElementLeft = <IconButton href={Utils.getLink('/grid/-1')}><IconHome/></IconButton>;
		}

		if (pageLocation === "details") {
			iconElementLeft = <IconButton onTouchTap={Header.goBackToGrid}><IconArrowBack/></IconButton>;
		}

		if (pageLocation === "settings") {
			iconElementRight = <div/>;
		}

		let appBarStyle = "";
		if (this.props.status) {
			const statusColor = StyleSheet.create({
				color: {
					borderColor: Utils.getColorForStatus(this.props.status)
				}
			});
			appBarStyle = css(AppStyles.headerBorderDetail, statusColor.color);
		}
		const notificationMessage = this.getNotificationMessage();

		iconElementRight = <div>{this.getHelpButton()}{iconElementRight}</div>;

		return (
			<div>
				<AppBar
					title={<span>{this.props.title}</span>}
					iconElementLeft={iconElementLeft}
					iconElementRight={iconElementRight}
					className={appBarStyle}/>
				<Notification
					open={!!notificationMessage}
					message={notificationMessage ? notificationMessage.message : ''}
					mode={notificationMessage ? notificationMessage.mode : {}}/>
			</div>
		);
	}

	render() {
		return (
			<Router basename={config.basename}>
				<Switch>
					<Route exact path="/" component={() => this.composeAppBar("grid")}/>
					<Route path="/grid/:entityId" component={() => this.composeAppBar("grid")}/>
					<Route path="/details/:parentId/:entityId" component={() => this.composeAppBar("details")}/>
					<Route exact path="/settings" component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/eventType/create" component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/eventType/:eventTypeId/eventQuery/create"
					       component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/eventType/:eventTypeId/eventQuery/:eventQueryId/edit"
					       component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/entityMapping/create" component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/entityMapping/:entityMappingId"
					       component={() => this.composeAppBar("settings")}/>
					<Route path="*" component={() => this.composeAppBar("grid")}/>
				</Switch>
			</Router>
		);
	}
} 
export default Header;