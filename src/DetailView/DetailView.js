import React from "react";
import {Container} from "react-grid-system";
import {PromiseState} from "react-refetch";
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
import {Toggle} from "material-ui";
import LoadingAnimation from "../Utils/LoadingAnimation";

class DetailView extends ConnectionComponent {

	constructor() {
		super();
		this.state = {
			filteredEvents: [],
			currentEventType: null,
			filter: [],
			eventChunkLoading: false,
		};
		this.includeEventChildren = false;
		this.events = [];
		this.eventChunk = [0, config.eventTableChunkSize];

		this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleEventChange = this.handleEventChange.bind(this);
		this.handleServerSideEventsChanged = this.handleServerSideEventsChanged.bind(this);
		this.handleEventChildrenSwitch = this.handleEventChildrenSwitch.bind(this);
		this.scrollHandler = this.scrollHandler.bind(this);
		this.resetEventChunk = this.resetEventChunk.bind(this);
		window.onscroll = this.scrollHandler;
		this.handleEventChunkChange = this.handleEventChunkChange.bind(this);
	}
	
	resetEventChunk() {
		this.eventChunk = [0, config.eventTableChunkSize];
	}
	
	scrollHandler() {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
			this.eventChunk[1] < this.state.currentEventType.NumberOfEvents) {
			this.eventChunk = [this.eventChunk[1] + 1, this.eventChunk[1] + config.eventTableChunkSize];
			this.setState({
				eventChunkLoading: true,
			});
			this.props.lazyEventLoading(
				this.state.currentEventType.Id,
				this.handleEventChunkChange,
				this.includeEventChildren,
				this.eventChunk
			);
		}
	}

	componentDidMount() {
		this.registerNotification("Event", parseInt(this.props.match.params.entityId, 10), this.handleServerSideEventsChanged);
		this.registerNotification("Entity", parseInt(this.props.match.params.entityId, 10), this.props.refreshEntity);
	}

	componentWillUnmount() {
		this.unregisterAllNotifications();
	}

	handleEventChildrenSwitch(event, isInputChecked) {
		this.resetEventChunk();
		this.includeEventChildren = isInputChecked;
		this.props.refreshEventTypes(this.handleEventTypeChange, isInputChecked);
	}
	
	handleServerSideEventsChanged(eventTypeId) {
		if (this.props.eventTypes.value.length) {
			this.props.lazyEventLoading(
				this.state.currentEventType.Id,
				this.handleEventChange,
				this.includeEventChildren,
				this.eventChunk
			);
		}
		if (eventTypeId && this.props.eventTypes.value.find((eventType) => {
				return eventType.Id === eventTypeId;
			}) === undefined) {
			this.props.refreshEventTypes(this.handleEventTypeChange, this.includeEventChildren);
		}
	}

	handleEventTypeChange(eventTypes) {
		if (eventTypes && eventTypes.length > 0) {
			const firstEventType = eventTypes[0];
			this.setState({
				currentEventType: firstEventType,
				filter: [],
			});
			this.props.lazyAttributeLoading(firstEventType.Id);
			this.props.lazyEventLoading(
				firstEventType.Id, 
				this.handleEventChange, 
				this.includeEventChildren,
				this.eventChunk);
		} 
		else {
			this.setState({
				filteredEvents: []
			});
		}
	}

	handleEventChange(events) {
		this.events = events;
		const filteredEvents = Utils.getFilteredEvents(events, this.state.filter);
		this.setState({
			filteredEvents: filteredEvents,
		});
	}

	handleEventChunkChange(events) {
		this.events = this.events.concat(events);
		const filteredEvents = Utils.getFilteredEvents(events, this.state.filter);
		this.setState({
			filteredEvents: this.state.filteredEvents.concat(filteredEvents),
			eventChunkLoading: false,
		});
	}

	handleFilterChange(filter) {
		this.resetEventChunk();
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
		else if (this.props.eventTypeAttributes.value && this.props.events.value) {
			return (
				<EventTable
					events={this.state.filteredEvents}
					eventTypeAttributes={this.props.eventTypeAttributes.value}/>
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
				styles={[AppStyles.w50]}/>
		);
	}

	getFilterBar() {
		const eventTypeAttributesPending = this.eventTypeAttributesPending();
		if (eventTypeAttributesPending) {
			return eventTypeAttributesPending;
		}
		return (
			<FilterBar
				onFiltersChange={this.handleFilterChange}
				autoCompleteSource={this.props.eventTypeAttributes.value.map(attributeInfo => attributeInfo.Name)}/>
		);
	}

	render() {
		const entity = this.props.entity.value;
		const eventTypes = this.props.eventTypes.value;
		const allFetches = PromiseState.all([this.props.entity, this.props.eventTypes]);
		const connectionIncomplete = super.render(allFetches);
		if (connectionIncomplete) {
			return connectionIncomplete;
		}
		const moreEventsAvailable = (this.state.currentEventType &&
										this.state.currentEventType.NumberOfEvents > this.eventChunk[1]);
		return (
			<div>
				<Header
					title={entity.Name}
					status={entity.Status}/>
				<Container>
					<Toggle
						label={config.descriptions.toggleChildrenEvents}
						defaultToggled={false}
						thumbStyle={{
							backgroundColor: config.colors.diagramLine,
						}}
						onToggle={this.handleEventChildrenSwitch}
						thumbSwitchedStyle={AppStyles.thumbSwitchedColor}
						className={css(AppStyles.elementMarginTop)}
						disabled={this.props.entity.HasChildren}
						style={AppStyles.toggle}
					/>
					<div className={css(AppStyles.dFlex, AppStyles.elementMarginTop)}>
						<EntityInformation
							entity={entity}
							styles={[AppStyles.w50]}/>
						{this.getEventDiagram()}
					</div>
					{this.getFilterBar()}
					<EventTabs
						eventTypes={eventTypes}
						onEventTypeChange={(eventTypes) => {
							this.resetEventChunk();
							this.handleEventTypeChange(eventTypes);
						}}
						styles={[AppStyles.elementMarginTop]}/>
					{this.getEventTable()}
					{moreEventsAvailable && 
						<div className={css(AppStyles.textAlignCenter, AppStyles.contentBox)}>
							{this.state.eventChunkLoading? 
								<LoadingAnimation 
									size={20} 
									thickness={5} />:
								<span>Scroll down to view more Events.</span>}
						</div>}
				</Container>
			</div>
		);
	}
}

export default ConnectionComponent.argosConnector()(props => {
	const entityUrl = config.backendRESTRoute + `/entity/${props.match.params.entityId}`;
	const eventTypesUrl = config.backendRESTRoute + `/entity/${props.match.params.entityId}/eventtypes/`;
	return {
		entity: entityUrl,
		refreshEntity: () => ({
			entity: {
				url: entityUrl,
				force: true,
				refreshing: true
			}
		}),
		eventTypes: eventTypesUrl + "false",
		refreshEventTypes: (handleEventTypeChange, includeChildren) => ({
			eventTypes: {
				url: eventTypesUrl + includeChildren.toString(),
				force: true,
				refreshing: true,
				then: eventTypes => handleEventTypeChange(eventTypes)
			}
		}),
		lazyAttributeLoading: eventTypeId => ({
			eventTypeAttributes: config.backendRESTRoute + `/eventtype/${eventTypeId}/attributes`,
		}),
		lazyEventLoading: (eventTypeId, eventHandler, includeChildren, chunk) => ({
			events: {
				url: config.backendRESTRoute
				+ `/entity/${props.match.params.entityId}/eventtype/${eventTypeId}
						/events/${includeChildren.toString()}/${chunk[0]}/${chunk[1]}`,
				force: true,
				refreshing: true,
				then: events => eventHandler(events),
			},
		})
	};

})(DetailView);
