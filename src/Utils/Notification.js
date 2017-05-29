import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconError from "material-ui/svg-icons/alert/error-outline";
import IconSuccess from "material-ui/svg-icons/navigation/check";
import {css} from 'aphrodite';
import AppStyles from "./../AppStyles";
import config from "./../config/config"

class Notification extends Component {
	static ModeEnum = {
		ERROR: "error",
		SUCCESS: "success"
	};

	getColorForMode() {
		if (this.props.mode === Notification.ModeEnum.ERROR) {
			return config.colors.error;
		} else if (this.props.mode === Notification.ModeEnum.SUCCESS) {
			return config.colors.success;
		} else {
			return config.colors.accent;
		}
	}

	getIconForMode() {
		if (this.props.mode === Notification.ModeEnum.ERROR) {
			return <IconError className={css(AppStyles.verticalAlignMarginRight, AppStyles.colorWhite)}/>;
		} else if (this.props.mode === Notification.ModeEnum.SUCCESS) {
			return <IconSuccess className={css(AppStyles.verticalAlignMarginRight, AppStyles.colorWhite)}/>;
		}
	}

	render() {
		return (
			<Snackbar
				open={this.props.open}
				message={<span className={css(AppStyles.displayTable)}>{this.getIconForMode()}{this.props.message} </span>}
				autoHideDuration={5000}
				bodyStyle={{backgroundColor: this.getColorForMode()}}/>);
	}
}

export default Notification;