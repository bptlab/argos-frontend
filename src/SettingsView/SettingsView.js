import React from "react";
import {Container} from "react-grid-system";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import Header from "./../Header";
import EventTypeCard from "./EventTypeCard";
import SearchBar from "./../Utils/SearchBar";
import FloatingActionButton from "material-ui/FloatingActionButton";
import IconAdd from "material-ui/svg-icons/content/add";
import Utils from '../Utils/Utils';
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";
import Notification from "./../Utils/Notification";
import help from './../config/help';
import config from "./../config/config";

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
		if (optionalActions && optionalActions.rejected) {
			Notification.addSnackbarNotificationOnSelf(optionalActions.reason,
				Notification.ModeEnum.ERROR);
		} else if(optionalActions && optionalActions.fulfilled && optionalActions === this.props.deleteEventTypeResponse) {
			Notification.addSnackbarNotificationOnSelf(config.messages.deletedEventTypeMessage,
				Notification.ModeEnum.SUCCESS);
		}
		return (
			<div>
				<Header title={config.descriptions.eventTypesView} />
				<Container className={css(AppStyles.containerMarginTop)}>
					<SearchBar onInputChange={this.handleSearchInput} styles={AppStyles.marginBottom}/>
					{this.props.eventTypes.value.map((eventType) => {
						if (this.searchMatches(eventType)) {
							return (<EventTypeCard
								eventType={eventType}
								key={eventType.Id}
								deleteEventType={this.props.deleteEventType}/>);
						} else {
							return false;
						}
					})}
				</Container>
				<FloatingActionButton
					backgroundColor={config.colors.primaryDark}
					className={css(AppStyles.floatingActionButton)}
					href={Utils.getLink('/settings/eventType/create')}
					title={help.button.createEventType}
					children={<IconAdd />} />
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