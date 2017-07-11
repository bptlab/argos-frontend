import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import Utils from '../Utils/Utils';
import ConfirmationMessage from './../Utils/ConfirmationMessage.js'
import {ListItem} from 'material-ui/List';
import help from './../config/help.js';


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
					ref={(input) => {this.confirmationMessage = input;}}
					message={help.messages.deletedQueryMessage}>
					{help.messages.deleteQueryMessage}
				</ConfirmationMessage>
				<IconButton
					tooltip={help.button.editEventQuery}
					href={Utils.getLink(`/settings/eventType/${this.props.eventType.Id}/eventQuery/${this.props.query.Id}/edit`)}
					className="verticalAlignTop">
					<IconEdit/>
				</IconButton>
				<IconButton
					tooltip={help.button.deleteEventQuery}
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
