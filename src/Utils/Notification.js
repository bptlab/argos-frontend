import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconError from "material-ui/svg-icons/alert/error-outline";
import IconSuccess from "material-ui/svg-icons/navigation/check";
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
		if(this.props.mode.color === Notification.ModeEnum.SUCCESS.color) {
			return <IconSuccess className="marginRight colorWhite" />;
		} else if (this.props.mode.color === Notification.ModeEnum.ERROR.color) {
			return <IconError className="marginRight colorWhite" />;
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
					<span className="dFlex alignItemsCenter">
						{this.getIconForMode()}
						<p className="capitalizeFirstLetter lineHeight25">
							{this.props.message}
						</p>
					</span>}
				autoHideDuration={config.notificationDisplayDuration}
				bodyStyle={{backgroundColor: this.props.mode.color, display: 'table'}}/>);
	}
}

export default Notification;