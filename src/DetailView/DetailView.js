import React from "react";
import {Container} from "react-grid-system";
import {connect, PromiseState} from "react-refetch";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import EntityInformation from "../Utils/EntityInformation";
import EventDiagram from "./EventDiagram";
import EventTable from "./EventTable";
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";
import Header from "../Header";
import EventTabs from "./EventTabs";
import config from "./../config/config.js";
import FilterBar from "./../Utils/FilterBar";
import Utils from "./../Utils/Utils";

class DetailView extends ConnectionComponent {

	constructor() {
		super();
		this.state = {
			filteredEvents: [],
			currentEventType: null,
			filter: [],
		};
		this.events = [];

		this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleEventChange = this.handleEventChange.bind(this);
	}

	handleEventTypeChange(eventType) {
		this.setState({
			currentEventType: eventType,
			filter: [],
		});
		this.props.lazyAttributeLoading(eventType.Id);
		this.props.lazyEventLoading(eventType.Id, this.handleEventChange);
	}

	handleEventChange(events) {
		this.events = events;
		const filteredEvents = Utils.getFilteredEvents(events, this.state.filter);
		this.setState({
			filteredEvents: filteredEvents,
		});
	}

	handleFilterChange(filter) {
		this.setState(
			{
				filter: filter,
			},
			() => this.handleEventChange(this.events)
		);
	}

	getEventTable() {
		if (!this.props.eventTypeAttributes || !this.props.events) {
			return "";
		}
		const allFetches = PromiseState.all([this.props.eventTypeAttributes, this.props.events]);
		const eventsAndAttributeConnection = super.render(allFetches);
		if (eventsAndAttributeConnection) {
			return eventsAndAttributeConnection;
		}
		else if(this.props.eventTypeAttributes.value && this.props.events.value) {
			return (
				<EventTable
					events={this.state.filteredEvents}
					eventTypeAttributes={this.props.eventTypeAttributes.value} />
			);
		}
	}

	eventTypeAttributesPending() {
		if (!this.props.eventTypeAttributes) {
			return <div />;
		}
		const eventTypeAttributeConnection = super.render(this.props.eventTypeAttributes);
		if (eventTypeAttributeConnection) {
			return eventTypeAttributeConnection;
		}
		if (!this.props.eventTypeAttributes.value) {
			return <div />;
		}
		return null;
	}

	getEventDiagram() {
		const eventTypeAttributesPending = this.eventTypeAttributesPending();
		if (eventTypeAttributesPending) {
			return eventTypeAttributesPending;
		}
		return (
			<EventDiagram
				events={this.state.filteredEvents}
				eventType={this.state.currentEventType}
				eventTypeAttributes={this.props.eventTypeAttributes.value}
				entity={this.props.entity.value}
				styles={[AppStyles.w50]} />
		);
	}

	getFilterBar() {
		const eventTypeAttributesPending = this.eventTypeAttributesPending();
		if (eventTypeAttributesPending) {
			return eventTypeAttributesPending;
		}
		return (
			<FilterBar
			 styles={[AppStyles.elementMarginTop]}
			 onFiltersChange={this.handleFilterChange}
			 autoCompleteSource={this.props.eventTypeAttributes.value.map(attributeInfo => attributeInfo.Name)}/>
		);
	}

	render() {
		const entity = this.props.entity.value;
		const eventTypes = this.props.eventTypes.value;
		const allFetches = PromiseState.all([this.props.entity, this.props.eventTypes]);
		const connectionIncomplete = super.render(allFetches);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}

		return (
			<div>
				<Header
					title={entity.Name}
					status={entity.Status}/>
				<Container>
					<div className={css(AppStyles.dFlex, AppStyles.elementMarginTop)}>
						<EntityInformation
							entity={entity}
							styles={[AppStyles.w50]}/>
						{this.getEventDiagram()}
					</div>
					{this.getFilterBar()}
					<EventTabs
						eventTypes={eventTypes}
						onEventTypeChange={this.handleEventTypeChange}
						styles={[AppStyles.elementMarginTop]} />
					{this.getEventTable()}
				</Container>
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	entity: config.backendRESTRoute + `/entity/${props.match.params.entityId}`,
	eventTypes: config.backendRESTRoute + `/entity/${props.match.params.entityId}/eventtypes/false`,
	lazyAttributeLoading: eventTypeId => ({
		eventTypeAttributes: config.backendRESTRoute + `/eventtype/${eventTypeId}/attributes`,
	}),
	lazyEventLoading: (eventTypeId, eventHandler) => ({
		events: {
			url: config.backendRESTRoute
					+ `/entity/${props.match.params.entityId}/eventtype/${eventTypeId}/events/false/0/10000`,
			then: events => eventHandler(events),
		},
	}),
}))(DetailView);
