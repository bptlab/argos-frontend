import React from 'react';
import {Container} from "react-grid-system";
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import Header from './../Header';
import EventTypeCard from './EventTypeCard';
import SearchBar from './../Utils/SearchBar';
import {Row} from 'react-grid-system';
import {css} from 'aphrodite';
import AppStyles from "./../AppStyles";
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import ErrorMessage from './../Utils/ErrorMessage.js';
import config from './../config/config';

class SettingsView extends ConnectionComponent {

	constructor() {
		super();
		this.state = {
			searchText: ''
		};
		this.handleSearchInput = this.handleSearchInput.bind(this);
		this.searchMatches = this.searchMatches.bind(this);
	}

	handleSearchInput(value) {
		this.setState({
			searchText: value
		});
	}

	searchMatches(eventType) {
		if (!this.state.searchText.value) {
			return true;
		}

		return (eventType.Name.toLowerCase().indexOf(this.state.searchText.value.toLowerCase()) > -1);
	}

	render() {
		const connectionIncomplete = super.render(this.props.eventTypes);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}
		const optionalActions = this.props.deleteEventTypeResponse;
		return (
			<div>
				<Header title="Settings"/>
				<Container className={css(AppStyles.elementMarginTop)}>
					<Row>
						<Card initiallyExpanded={true}>
							<CardHeader
								title="Event Types"
								actAsExpander={true}
								showExpandableButton={true}/>
							<CardText expandable={true}>
								<Container>
									<SearchBar onInputChange={this.handleSearchInput}/>
									{optionalActions && optionalActions.rejected &&
										<ErrorMessage message={optionalActions.reason}/>
									}
									{this.props.eventTypes.value.map((eventType) => {
										if (this.searchMatches(eventType)) {
											return (<EventTypeCard
												eventType={eventType}
												key={eventType.Id}
												deleteEventType={this.props.deleteEventType}/>);
										} else {
											return false;
										}
									})
									}
								</Container>
							</CardText>
							<CardActions>
								<IconButton
									tooltip={<span>create new event type</span>}
									href="settings/eventType/create">
									<IconAdd/>
								</IconButton>
							</CardActions>
						</Card>
					</Row>
				</Container>
			</div>
		);
	}
}

export default ConnectionComponent.argosConnector()(() => {
	const eventTypeUrl = config.backendRESTRoute + `/eventtypes`;
	return {
		eventTypes: eventTypeUrl,
		deleteEventType: eventType => ({
			deleteEventTypeResponse: {
				url: config.backendRESTRoute + `/eventtype/${eventType.Id}/delete`,
				method: 'DELETE',
				andThen: () => ({
					eventTypes: {
						url: eventTypeUrl,
						refreshing: true,
						force: true
					}
				})
			}
		})
	};
})(SettingsView);