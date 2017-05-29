import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconError from "material-ui/svg-icons/alert/error-outline";
import IconSuccess from "material-ui/svg-icons/navigation/check";
import {css} from 'aphrodite';
import AppStyles from "./../AppStyles";
import config from "./../config/config"

class Notification extends Component {
	static ModeEnum = {
		ERROR: {
			color: config.colors.error
		},
		SUCCESS: {
			color: config.colors.success
		}
	};

	getIconForMode() {
		if(this.props.mode.color === Notification.ModeEnum.SUCCESS.color) {
			return <IconSuccess className={css(AppStyles.verticalAlignMarginRight, AppStyles.colorWhite)}/>;
		} else if (this.props.mode === Notification.ModeEnum.ERROR) {
			return <IconError className={css(AppStyles.verticalAlignMarginRight, AppStyles.colorWhite)}/>;
		}
	}

	render() {
		if(this.props.open) {
			window.sessionStorage.removeItem('notificationMessage');
		}
		return (
			<Snackbar
				open={this.props.open}
				message={<span className={css(AppStyles.dFlex, AppStyles.alignItemsCenter)}>{this.getIconForMode()}<p className={css(AppStyles.capitalizeFirstLetter, AppStyles.lineHeight25)}>{this.props.message}</p> </span>}
				autoHideDuration={config.notificationDisplayDuration}
				bodyStyle={{backgroundColor: this.props.mode.color}}/>);
	}
}

export default Notification;