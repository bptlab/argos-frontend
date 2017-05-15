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
import config from './../config/config.js';

class DetailView extends ConnectionComponent {

	constructor() {
		super();
		this.state = {
			events: null,
			currentEventType: null,
		};
		this.handleEventsChange = this.handleEventsChange.bind(this);
		this.handleEventTypeChange = this.handleEventTypeChange.bind(this);
	}

	handleEventsChange(events) {
		this.setState({
			events: events,
		});
	}
	
	handleEventTypeChange(eventType) {
		this.setState({
			currentEventType: eventType,
		});
	}

	render() {
		const entity = this.props.entity.value;
		const eventTypes = this.props.eventTypes.value;
		const allFetches = PromiseState.all([this.props.entity, this.props.eventTypes]);
		const connectionIncomplete = super.render(allFetches);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}

		// let currentEventType = this.state.currentEventType;
		if (!this.state.currentEventType && eventTypes.length > 0) {
			let currentEventType = eventTypes[0];
			this.handleEventTypeChange(currentEventType);
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
						<EventDiagram
							events={this.state.events}
							eventType={this.state.currentEventType}
							styles={[AppStyles.w50]} />
					</div>
					<EventTabs
						eventTypes={eventTypes}
						onEventTypeChange={this.handleEventTypeChange}
						styles={[AppStyles.elementMarginTop]} />
					<EventTable
						entityId={this.props.match.params.entityId}
						eventType={this.state.currentEventType}
						onEventsChange={this.handleEventsChange} />
				</Container>
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	entity: config.backendRESTRoute + `/entity/${props.match.params.entityId}`,
	eventTypes: config.backendRESTRoute + `/entity/${props.match.params.entityId}/eventtypes`,
}))(DetailView);
