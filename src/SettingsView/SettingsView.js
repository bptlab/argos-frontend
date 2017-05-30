import React from "react";
import {Container, Row} from "react-grid-system";
import Utils from '../Utils/Utils';
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import Header from "./../Header";
import EventTypeCard from "./EventTypeCard";
import SearchBar from "./../Utils/SearchBar";
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import IconAdd from "material-ui/svg-icons/content/add";
import config from "./../config/config";
import help from "./../config/help";

class SettingsView extends ConnectionComponent {

	constructor() {
		super();

		this.state = {
			searchText: '',
			snackbarOpen: false,
			snackbarMessage: '',
			snackbarMode: {},
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
						<Card
							data-hint={help.display.settingsView.eventTypes}
							data-hintPosition="top-middle"
							initiallyExpanded={true}>
							<CardHeader
								title="Event Types"
								actAsExpander={true}
								showExpandableButton={true}/>
							<CardText expandable={true}>
								<Container>
									<SearchBar onInputChange={this.handleSearchInput}/>
									{optionalActions && optionalActions.rejected &&
										<Notification
											open={true}
											message={optionalActions.reason}
											mode={Notification.ModeEnum.ERROR}/>
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
									href={Utils.getLink('/settings/eventType/create')} >
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