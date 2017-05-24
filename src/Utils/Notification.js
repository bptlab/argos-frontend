import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconError from "material-ui/svg-icons/alert/error-outline";
import IconSuccess from "material-ui/svg-icons/navigation/check";
import {css} from 'aphrodite';
import AppStyles from "./../AppStyles";

class ConfirmationMessage extends Component {
	
	constructor(props) {
		super(props);
	}

	getColorForMode() {
		if (this.props.mode === "error") {
			return "#f44336";
		} else if (this.props.mode === "success") {
			return "#8BC34A";
		}
	}

	getIconForMode() {
		if (this.props.mode === "error") {
			return <IconError className={css(AppStyles.verticalAlignMarginRight, AppStyles.colorWhite)}/>;
		} else if (this.props.mode === "success") {
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

export default ConfirmationMessage;