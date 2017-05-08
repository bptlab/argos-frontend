import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import ConfirmationMessage from './../Utils/ConfirmationMessage.js'
import {ListItem} from 'material-ui/List';


class EventQueryListItem extends Component {
	
	constructor(props) {
		super(props);
		this.deleteEventQuery = this.deleteEventQuery.bind(this);
		this.deleteEventQueryButton = this.deleteEventQueryButton.bind(this);
	}
	
	deleteEventQuery() {
		this.props.deleteQuery(this.props.query);
	}

	editEventQuery() {
		// TODO: to be filled
	}

	deleteEventQueryButton () {
		return (
			<div>
				<ConfirmationMessage 
					actionToPerform={this.deleteEventQuery}
					ref={(input) => {this.confirmationMessage = input;}}>
					Do you really want to delete this Query?
				</ConfirmationMessage>
				<IconButton onTouchTap={this.editEventQuery}>
					<IconEdit/>
				</IconButton>
				<IconButton
					onClick={() => {this.confirmationMessage.handleOpen()}}>
					<IconDelete/>
				</IconButton>
			</div>
		);
	}

	render() {
		return (
			<ListItem
				primaryText={this.props.query.Description}
				secondaryText={this.props.query.Query}
				rightIconButton={this.deleteEventQueryButton()}
			/>
		);
	}
}

export default EventQueryListItem;
