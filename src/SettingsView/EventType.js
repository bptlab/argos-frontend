import React from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import EventQueryListItem from  './EventQueryListItem.js';
import config from './../config/config.js';
import { css } from 'aphrodite';
import AppStyles from '../AppStyles';
import { Row, Col } from 'react-grid-system';
import {PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import ErrorMessage from './../Utils/ErrorMessage.js';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import ConfirmationMessage from './../Utils/ConfirmationMessage.js'

class EventType extends ConnectionComponent {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		};
		this.handleExpandChange = this.handleExpandChange.bind(this);
		this.deleteEventType = this.deleteEventType.bind(this);
	}

	handleExpandChange(expanded) {
		this.setState({expanded: expanded});
	}
	
	deleteEventType() {
		this.props.deleteEventType(this.props.eventType);
	}

	getEventTypeHeaderButtons() {
		return [
			<IconButton><IconEdit/></IconButton>,
			<IconButton><IconDelete/></IconButton>];
	}

	render() {
		const allFetches = PromiseState.all([this.props.queries, this.props.attributes]);
		const optionalActions = this.props.deleteQueryResponse;
		const queries = this.props.queries.value;
		const attributes = this.props.attributes.value;
		const connectionIncomplete = super.render(allFetches);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		return (
			<div>
			{optionalActions && optionalActions.rejected &&
				<ErrorMessage message={optionalActions.reason} />
			}
			<ConfirmationMessage
				actionToPerform={this.deleteEventType}
				ref={(input) => {this.confirmationMessage = input;}}>
				{config.messages.deleteEventTypeMessage}
			</ConfirmationMessage>
			<Card
				expanded={this.state.expanded}
				onExpandChange={this.handleExpandChange}>
				<CardHeader
					title={this.props.eventType.Name}
					subtitle={`${config.descriptions.textNumberOfEvents} ${this.props.eventType.NumberOfEvents}`}
					actAsExpander={true}
					showExpandableButton={true}
					children={this.getEventTypeHeaderButtons()}
				/>
				<CardText
					expandable={true}
					className={css(AppStyles.dFlex)}>
					<List className={css(AppStyles.w50)}>
						{attributes.map((attribute) => { return(
							<ListItem 
								primaryText={attribute.Name}
								key={attribute.Id}
							/>);
						})}
					</List>
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
					<IconButton href="settings/eventType/create"><IconAdd/></IconButton>

				</CardText>
				<CardActions>

				</CardActions>
			</Card>
			</div>
		);
	}
}

export default ConnectionComponent.argosConnector()(props => ({
	queries: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/queries`,
	attributes: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/attributes`,
	deleteQuery: query => ({
		deleteQueryResponse: {
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