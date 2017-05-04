import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import EventQueryListItem from  './EventQueryListItem';
import config from './../config/config.js';
import { css } from 'aphrodite';
import AppStyles from '../AppStyles';
import {connect, PromiseState} from 'react-refetch';
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
		const allFetches = PromiseState.all([this.props.queries, this.props.attributes]);
		const queries = this.props.queries.value;
		const attributes = this.props.attributes.value;
		const connectionIncomplete = super.render(allFetches);
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
						{queries.value.forEach((query) => {
								return(<EventQueryListItem query={query} />);
							}
						)}
					</List>
					<List className={css(AppStyles.w50)}>
						{attributes.map((attribute) => {
							return(
								<ListItem
									primaryText={attribute.Name}
									secondaryText={attribute.Id}
								/>
							);
						})}
					</List>
				</CardText>
			</Card>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	queries: `/eventtype/${props.eventType.Id}/queries`,
	attributes: `/eventtype/${props.eventType.Id}/attributes`
}))(EventType);