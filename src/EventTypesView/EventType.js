import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import EventQueryListItem from  './EventQueryListItem';


class EventType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		};
	}

	handleExpandChange = (expanded) => {
		this.setState({expanded: expanded});
	};

	render() {
		return (
			<Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
				<CardHeader
					title="Event type 1"
					subtitle="Event type description 1"
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true} className="d-flex">
					<List className="w-50">
						<EventQueryListItem/>
						<EventQueryListItem/>
						<EventQueryListItem/>
						<EventQueryListItem/>
						<EventQueryListItem/>
						<EventQueryListItem/>
					</List>
					<List className="w-50">
						<ListItem
							primaryText="Event Type Attribute 1 Value"
							secondaryText="Event Type Attribute 1 Name"
						/>
						<ListItem
							primaryText="Event Type Attribute 1 Value"
							secondaryText="Event Type Attribute 1 Name"
						/>
						<ListItem
							primaryText="Event Type Attribute 1 Value"
							secondaryText="Event Type Attribute 1 Name"
						/>
						<ListItem
							primaryText="Event Type Attribute 1 Value"
							secondaryText="Event Type Attribute 1 Name"
						/>
					</List>
				</CardText>
			</Card>
		);
	}
}

export default EventType;
