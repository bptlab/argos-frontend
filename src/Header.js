import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconHome from "material-ui/svg-icons/action/home";
import IconSettings from "material-ui/svg-icons/action/settings";
import IconArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import Utils from './Utils/Utils';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import config from "./config/config";
import {css, StyleSheet} from "aphrodite";
import AppStyles from "./AppStyles";

class Header extends Component {
	static goBackInHistory() {
		window.history.back();
	}

	static goBackToGrid() {
		const currentPath = window.location.pathname;
        const newPath = currentPath.replace("details", "grid");
        window.location.href = newPath.substring(0, newPath.lastIndexOf("/") + 1);
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
        //all pages for creation of eventqueries, eventtypes and mappings
        if (pageLocation === "create" || pageLocation === "settings") {
            iconElementRight = <div/>;
		}

        let appBarStyle = "";
        if(this.props.status) {
            const statusColor = StyleSheet.create({
                color: {
                    borderColor: Utils.getStatus(this.props.status).color
                }
            });
            appBarStyle = css(AppStyles.headerBorderDetail, statusColor.color);
        }

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

					<Route path="*" component={() => this.composeAppBar("grid")}/>
				</Switch>
			</Router>
		);
    }
}
