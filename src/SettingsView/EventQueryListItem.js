import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import {ListItem} from 'material-ui/List';


class EventQueryListItem extends Component {
	deleteEventQuery() {
		// TODO: to be filled
	}

	editEventQuery() {
		// TODO: to be filled
	}

	static deleteEventQueryButton () {
		return (
			<div>
				<IconButton onTouchTap={this.editEventQuery}>
					<IconEdit/>
				</IconButton>
				<IconButton onTouchTap={this.deleteEventQuery}>
					<IconDelete/>
				</IconButton>
			</div>
		);
	}

	render() {
		return (
			<ListItem
				primaryText="Event Query 1"
				rightIconButton={EventQueryListItem.deleteEventQueryButton()}
			/>
		);
	}
}

export default EventQueryListItem;
