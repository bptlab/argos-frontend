import React, { Component } from 'react';
import {connect, PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import EventTabs from './EventTabs';
import { css } from 'aphrodite';
import AppStyles from './../AppStyles';

class EventTable extends ConnectionComponent {

	constructor(props) {
		super(props);

		this.handleActiveEventTypeChange = this.handleActiveEventTypeChange.bind(this);
	}

	composeTableHeader(eventTypeAttributes) {
		return (
			<TableHeader
				displaySelectAll={false}
				adjustForCheckbox={false}>
				<TableRow>
					{eventTypeAttributes.map(
						(attribute, key) => {
							return (
								<TableHeaderColumn
									className={css(AppStyles.capitalize)}
									key={key}>
									{attribute.Name}
								</TableHeaderColumn>
							);
						})
					}
				</TableRow>
			</TableHeader>
		);
	}

	composeTableRow(event, key) {
		let row = event.Attributes.map(
			(eventAttribute, attributeKey) => {
				return (
					<TableRowColumn key={attributeKey}>
						{eventAttribute.Value}
					</TableRowColumn>
				);
			});
		return (<TableRow key={key}>{row}</TableRow>);
	}

	composeTableBody(events) {
		return (
			<TableBody displayRowCheckbox={false}>
				{events.map((event, key) =>
					this.composeTableRow(event, key))}
			</TableBody>
		);
	}

	handleActiveEventTypeChange(eventTypeId) {
		this.props.lazyEventLoading(eventTypeId);
	}

	loadTableContent() {
		const eventFetchingIncomplete = super.render(PromiseState.all([
			this.props.eventTypeAttributes,
			this.props.events]));
		if(eventFetchingIncomplete) {
			return eventFetchingIncomplete;
		}
		else {
			return (
				<Table>
					{this.composeTableHeader(this.props.eventTypeAttributes.value)}
					{this.composeTableBody(this.props.events.value)}
				</Table>
			);
		}
	}

	render() {
		const eventTypes = this.props.eventTypes.value;
		const connectionIncomplete = super.render(this.props.eventTypes);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		let tableContent = "";
		if (this.props.eventTypeAttributes && this.props.events) {
			tableContent = this.loadTableContent();
		}
		return (
			<div>
				<EventTabs
					eventTypes={eventTypes}
					eventTypeChangeHandler={this.handleActiveEventTypeChange}
					styles={[AppStyles.elementMarginTop]} />
				{tableContent}
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	eventTypes: `/entity/${props.entityId}/eventtypes`,
	lazyEventLoading: eventTypeId => ({
		eventTypeAttributes: `/eventtype/${eventTypeId}/attributes`,
		events: `/entity/${props.entityId}/eventtype/${eventTypeId}/events`
	}),
}))(EventTable);
