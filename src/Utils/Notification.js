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
			color: config.colors.error,
			icon: <IconError className={css(AppStyles.verticalAlignMarginRight, AppStyles.colorWhite)}/>
		},
		SUCCESS: {
			color: config.colors.success,
			icon: <IconSuccess className={css(AppStyles.verticalAlignMarginRight, AppStyles.colorWhite)}/>
		}
	};

	render() {
		return (
			<Snackbar
				open={this.props.open}
				message={<span className={css(AppStyles.displayTable)}>{this.props.mode.icon}{this.props.message} </span>}
				autoHideDuration={5000}
				bodyStyle={{backgroundColor: this.props.mode.color}}/>);
	}
}

export default Notification;