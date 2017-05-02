import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import EventQueryListItem from  './EventQueryListItem';
import config from './../config/config.js';
import { css } from 'aphrodite';
import AppStyles from '../AppStyles';
import {connect} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';


class EventType extends ConnectionComponent {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		};
		this.handleExpandChange = this.handleExpandChange.bind(this);
	}

	handleExpandChange(expanded) {
		this.setState({expanded: expanded});
	}

	render() {
		const connectionIncomplete = super.render(this.props.queries);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		return (
			<Card
				expanded={this.state.expanded}
				onExpandChange={this.handleExpandChange}>
				<CardHeader
					title={this.props.eventType.Name}
					subtitle={`${config.textNumberOfEvents} ${this.props.eventType.NumberOfEvents}`}
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText
					expandable={true}
					className={css(AppStyles.dFlex)}>
					<List className={css(AppStyles.w50)}>
						{this.props.queries.value.forEach((query) => {
								return(<EventQueryListItem query={query} />);
							}
						)}
					</List>
					<List className={css(AppStyles.w50)}>
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

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	queries: `/eventtype/${props.eventType.Id}/queries`,
}))(EventType);
