import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

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

	render() {
		return (
			<Snackbar
				open={this.props.open}
				message={this.props.message}
				autoHideDuration="5000"
				bodyStyle={{backgroundColor: this.getColorForMode()}}/>);
	}
}

export default ConfirmationMessage;