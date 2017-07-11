import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import help from "../config/help";

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
	}

	render() {
		const actions = [
			<FlatButton
				label={help.descriptions.abort}
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label={help.descriptions.confirm}
				primary={true}
				onTouchTap={this.handleSubmit}
			/>,
		];
		return (
			<Dialog
				title={help.descriptions.confirmationTitle}
				actions={actions}
				modal={false}
				open={this.state.visible}
				onRequestClose={this.handleClose}>
				{this.props.children}
			</Dialog>);
	}
}

export default ConfirmationMessage;