import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';


class EventTypesView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		};
	}

	handleExpandChange = (expanded) => {
		this.setState({expanded: expanded});
	};

	handleReduce = () => {
		this.setState({expanded: false});
	};
	render() {
		return (
			<div>
				<Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
					<CardHeader
						title="Event type title"
						subtitle="Event type description?"
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
						<List>
							<ListItem
								primaryText="Kerem Suer"
							/>
							<ListItem
								primaryText="Kerem Suer"
							/>
							<ListItem
								primaryText="Kerem Suer"
							/>
							<ListItem
								primaryText="Kerem Suer"
							/>
							<ListItem
								primaryText="Kerem Suer"
							/>
						</List>
						<List>
							<ListItem
								primaryText="Kerem Suer"
								secondaryText="Jan 9, 2014"
							/>
							<ListItem
								primaryText="Kerem Suer"
								secondaryText="Jan 9, 2014"
							/>
							<ListItem
								primaryText="Kerem Suer"
								secondaryText="Jan 9, 2014"
							/>
							<ListItem
								primaryText="Kerem Suer"
								secondaryText="Jan 9, 2014"
							/>
						</List>
					</CardText>
				</Card>

				<Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
					<CardHeader
						title="Event type title"
						subtitle="Event type description?"
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
						<List>
							<ListItem
								primaryText="Kerem Suer"
							/>
							<ListItem
								primaryText="Kerem Suer"
							/>
							<ListItem
								primaryText="Kerem Suer"
							/>
							<ListItem
								primaryText="Kerem Suer"
							/>
							<ListItem
								primaryText="Kerem Suer"
							/>
						</List>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default EventTypesView;
