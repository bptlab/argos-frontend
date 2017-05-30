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

	constructor(props) {
		super(props);
		this.state = {
			message: props.message,
			mode: props.mode
		};
		this.handleTriggeredNotification = this.handleTriggeredNotification.bind(this);
		window.addEventListener('notificationTriggered', this.handleTriggeredNotification, false);
	}

	handleTriggeredNotification() {
		this.setState({
			message: JSON.parse(window.sessionStorage.getItem('notificationMessage')).message,
			mode: JSON.parse(window.sessionStorage.getItem('notificationMessage')).mode
		});
	}

	static addSnackbarNotificationOnReferrer(message, mode) {
		window.sessionStorage.setItem('notificationMessage',
			JSON.stringify({message: message, targetPage: document.referrer, mode: mode, timestamp: new Date()}));
		window.dispatchEvent(new Event('notificationTriggered'));
	}

	static addSnackbarNotificationOnSelf(message, mode) {
		window.sessionStorage.setItem('notificationMessage',
			JSON.stringify({message: message, targetPage: window.location.href, mode: mode, timestamp: new Date()}));
		window.dispatchEvent(new Event('notificationTriggered'));
	}

	getIconForMode() {
		if(this.state.mode.color === Notification.ModeEnum.SUCCESS.color) {
			return <IconSuccess className={css(AppStyles.marginRight, AppStyles.colorWhite)}/>;
		} else if (this.state.mode.color === Notification.ModeEnum.ERROR.color) {
			return <IconError className={css(AppStyles.marginRight, AppStyles.colorWhite)}/>;
		}
	}

	render() {
		if(this.props.open) {
			window.sessionStorage.removeItem('notificationMessage');
		}
		return (
			<Snackbar
				open={this.props.open}
				message={
					<span className={css(AppStyles.dFlex, AppStyles.alignItemsCenter)}>
						{this.getIconForMode()}
						<p className={css(AppStyles.capitalizeFirstLetter, AppStyles.lineHeight25)}>
							{this.state.message}
						</p>
					</span>}
				autoHideDuration={config.notificationDisplayDuration}
				bodyStyle={{backgroundColor: this.props.mode.color}}/>);
	}
}

export default Notification;