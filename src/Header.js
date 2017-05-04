import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconHome from "material-ui/svg-icons/action/home";
import IconSettings from "material-ui/svg-icons/action/settings";
import IconArrowBack from "material-ui/svg-icons/navigation/arrow-back";
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
		let iconElementLeft;

		if (pageLocation === "grid") {
            iconElementLeft = <IconButton href="/grid/-1"><IconHome/></IconButton>;
        }
        if (pageLocation === "details") {
            iconElementLeft = <IconButton onTouchTap={Header.goBackToGrid}><IconArrowBack/></IconButton>;
        }
        if (pageLocation === "settings") {
			iconElementLeft = <IconButton onTouchTap={Header.goBackInHistory}><IconArrowBack/></IconButton>;
        }

        let className = "";
        if(this.props.status) {
            const statusColor = StyleSheet.create({
                color: {
                    borderColor: config.status[this.props.status]
                }
            });
            className = css(AppStyles.headerBorderDetail, statusColor.color);
        }

        return (
			<AppBar
				title={<span>{this.props.title}</span>}
				iconElementLeft={iconElementLeft}
				iconElementRight={<IconButton href="/settings"><IconSettings/></IconButton>}
				className={className}
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
					<Route path="/settings" component={() => this.composeAppBar("settings")}/>
					<Route path="*" component={() => this.composeAppBar("grid")}/>
				</Switch>
			</Router>
		);
    }
}

export default Header;