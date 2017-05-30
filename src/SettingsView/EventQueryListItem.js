import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import ConfirmationMessage from './../Utils/ConfirmationMessage.js'
import {ListItem} from 'material-ui/List';
import config from './../config/config.js';


class EventQueryListItem extends Component {
	
	constructor(props) {
		super(props);
		this.deleteEventQuery = this.deleteEventQuery.bind(this);
		this.eventQueryActionButtons = this.eventQueryActionButtons.bind(this);
	}
	
	deleteEventQuery() {
		this.props.deleteQuery(this.props.query);
	}

	eventQueryActionButtons () {
		return (
			<div>
				<ConfirmationMessage 
					actionToPerform={this.deleteEventQuery}
					ref={(input) => {this.confirmationMessage = input;}}>
					{config.messages.deleteQueryMessage}
				</ConfirmationMessage>
				<IconButton
					tooltip="Edit this query"
					href={`/settings/eventType/${this.props.eventType.Id}/eventQuery/${this.props.query.Id}/edit`}>
					<IconEdit/>
				</IconButton>
				<IconButton
					tooltip="Delete this query"
					onTouchTap={() => {this.confirmationMessage.handleOpen();}}>
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
				rightIconButton={this.eventQueryActionButtons()}
			/>
		);
	}
}

export default EventQueryListItem;
