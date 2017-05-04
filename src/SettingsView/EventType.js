import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import EventQueryListItem from  './EventQueryListItem.js';
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
		this.handleEventTypeDeletion = this.handleEventTypeDeletion.bind(this);
	}

	handleExpandChange(expanded) {
		this.setState({expanded: expanded});
	}
	
	handleEventTypeDeletion() {
		this.props.deleteEventType(this.props.eventType);
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
					subtitle={`${config.descriptions.textNumberOfEvents} ${this.props.eventType.NumberOfEvents}`}
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText
					expandable={true}
					className={css(AppStyles.dFlex)}>
					<List className={css(AppStyles.w50)}>
						{queries.map((query) => {
							return(
							<EventQueryListItem
								query={query}
								deleteQuery={this.props.deleteQuery}
								key={query.Id}/>);
							}
						)}
					</List>
					<List className={css(AppStyles.w50)}>
						{attributes.map((attribute) => { return(
							<ListItem 
								primaryText={attribute.Name}
								key={attribute.Id}
							/>);
						})}
					</List>
				</CardText>
			</Card>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	queries: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/queries`,
	attributes: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/attributes`,
	deleteQuery: query => ({
		postLikeResponse: {
			url: config.backendRESTRoute + `/eventquery/${query.Id}/delete`,
			method: 'DELETE',
			body: "",
			andThen: () => ({
				queries: {
					url: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/queries`,
					refreshing: true
				}
			})
		}
	})
}))(EventType);