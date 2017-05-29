import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Notification from './Notification'

class ConfirmationMessage extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleOpen() {
		this.setState({
			visible: true
		});
	}
	
	handleClose() {
		this.setState({
			visible: false
		});
	}
	
	handleSubmit() {
		this.props.actionToPerform();
		this.handleClose();
		this.props.onSnackbarMessage(this.props.message, Notification.ModeEnum.SUCCESS);
	}

	render() {
		const actions = [
			<FlatButton
				label="No"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Yes"
				primary={true}
				onTouchTap={this.handleSubmit}
			/>,
		];
		return (
			<Dialog
				title="Confirmation Prompt"
				actions={actions}
				modal={false}
				open={this.state.visible}
				onRequestClose={this.handleClose}>
				{this.props.children}
			</Dialog>);
	}
}

export default ConfirmationMessage;