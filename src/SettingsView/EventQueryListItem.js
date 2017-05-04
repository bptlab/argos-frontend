import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconDelete from 'material-ui/svg-icons/action/delete';
import {ListItem} from 'material-ui/List';
import {connect} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';


class EventQueryListItem extends ConnectionComponent {
	deleteEventQuery() {
		this.props.deleteQuery(this.props.query);
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
				primaryText={this.props.query.Description}
				secondaryText={this.props.query.Query}
				rightIconButton={EventQueryListItem.deleteEventQueryButton()}
			/>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	deleteQuery: query => ({
		postLikeResponse: {
			url: `/eventquery/${query.Id}/delete`,
			method: 'DELETE',
			body: ""
		}
	})
}))(EventQueryListItem);
