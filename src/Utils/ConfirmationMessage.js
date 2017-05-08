import React, { Component } from 'react';
import { css } from 'aphrodite';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DeleteDialog extends Component {
	
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
		this.props.
		this.handleClose();
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
				title="Are you sure?"
				actions={actions}
				modal={false}
				open={this.state.open}
				onRequestClose={this.handleClose}>
				Do you really want to delete?
			</Dialog>);
	}
}

export default DeleteDialog;