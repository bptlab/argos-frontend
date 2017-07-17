import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconHome from "material-ui/svg-icons/action/home";
import IconSettings from "material-ui/svg-icons/action/settings";
import IconArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {css, StyleSheet} from "aphrodite";
import Utils from "./Utils/Utils";
import Notification from "./Utils/Notification";
import config from "./config/config";
import HelpButton from "./Utils/HelpButton";
import "./Header.css";
import "./App.css";

class Header extends Component {
	static lastNotificationTimestamp;

	constructor(props) {
		super(props);
		Header.lastNotificationTimestamp = new Date();
		this.handleTriggeredNotification = this.handleTriggeredNotification.bind(this);
		window.addEventListener('notificationTriggered', this.handleTriggeredNotification, false);
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
		let iconElementRight = <IconButton
									className="whiteIcon verticalAlignTop"
									href={Utils.getLink('/settings')}>
									<IconSettings/>
								</IconButton>;

		if (pageLocation === "grid") {
			iconElementLeft = <IconButton href={Utils.getLink('/grid/-1')}><IconHome/></IconButton>;
		}

		if (pageLocation === "details") {
			iconElementLeft = <IconButton onTouchTap={Header.goBackToGrid}><IconArrowBack/></IconButton>;
		}

		if (pageLocation === "settings") {
			iconElementRight = <div/>;
		}

		let appBarStyle = "positionFixedTop";
		if (this.props.status) {
			const statusColor = StyleSheet.create({
				color: {
					borderColor: Utils.getColorForStatus(this.props.status)
				}
			});
			appBarStyle = "headerBorderDetail positionFixedTop" + css(statusColor.color);
		}
		const notificationMessage = this.getNotificationMessage();

		iconElementRight = <div><HelpButton />{iconElementRight}</div>;

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
					<Route path="/analytics" component={() => this.composeAppBar("settings")} />
					<Route exact path="/settings" component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/eventType/create" component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/eventType/:eventTypeId/eventQuery/create"
					       component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/eventType/:eventTypeId/eventQuery/:eventQueryId/edit"
					       component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/entityMapping/:eventTypeId/create" component={() => this.composeAppBar("settings")}/>
					<Route path="/settings/entityMapping/:entityMappingId"
					       component={() => this.composeAppBar("settings")}/>
					<Route path="*" component={() => this.composeAppBar("grid")}/>
				</Switch>
			</Router>
		);
	}
}
export default Header;