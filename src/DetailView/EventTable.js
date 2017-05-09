import React from "react";
import {connect, PromiseState} from "react-refetch";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import EventTabs from "./EventTabs";
import FilterBar from "./../Utils/FilterBar";
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";
import config from "./../config/config";

class EventTable extends ConnectionComponent {

	constructor(props) {
		super(props);

		this.state = {
			filter: [],
		};

		this.handleActiveEventTypeChange = this.handleActiveEventTypeChange.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
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
		const row = event.Attributes.map(
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
				{events.map((event, key) => {
					if (!this.isCoveredByFilter(event)) {
						return "";
					}
					return this.composeTableRow(event, key);
				})}
			</TableBody>
		);
	}

	isCoveredByFilter(event) {
		// every is equivalent to logical and over an array
		return this.state.filter.every((filter) => {
			return this.testFilter(event, filter);
		});
	}

	testFilter(event, filter) {
		if (!filter.value) {
			return true;
		}
		let columnsToBeSearched = this.props.eventTypeAttributes.value;
		if(filter.column) {
			columnsToBeSearched = columnsToBeSearched.filter((eventPropertyKey) => {
				return EventTable.doesContain(eventPropertyKey.Name, filter.column);
			});
		}

		return columnsToBeSearched.some((eventPropertyKey) => {
			const splittedFilterValues = filter.value.split(",");
			const eventAttribute = event.Attributes.find(attribute => attribute.Name === eventPropertyKey.Name);
			return splittedFilterValues.some(filterValue => {
				const currentFilterValue = filterValue.trim();
				if (currentFilterValue &&  EventTable.doesContain(eventAttribute.Value, currentFilterValue)) {
					return true;
				}
			});
		});
	}

	static doesContain(baseValue, subValue) {
		return (baseValue.toString().toLowerCase().indexOf(subValue.toString().toLowerCase()) > -1);
	}

	handleActiveEventTypeChange(eventTypeId) {
		this.setState({filter: []});
		this.props.lazyEventLoading(eventTypeId);
	}

	handleFilterChange(filter) {
		this.setState({
			filter: filter,
		});
	}

	loadTableContent() {
		const eventFetchingIncomplete = super.render(PromiseState.all([
			this.props.eventTypeAttributes,
			this.props.events]));
		if(eventFetchingIncomplete) {
			return eventFetchingIncomplete;
		}
		return (
			<Table>
				{this.composeTableHeader(this.props.eventTypeAttributes.value)}
				{this.composeTableBody(this.props.events.value)}
			</Table>
		);
	}

	loadFilterBar() {
		return (
			<FilterBar
				styles={[AppStyles.elementMarginTop]}
				onFiltersChange={this.handleFilterChange}
				autoCompleteSource={this.props.eventTypeAttributes.value.map(attributeInfo => attributeInfo.Name)} />
		);
	}

	render() {
		const eventTypes = this.props.eventTypes.value;
		const connectionIncomplete = super.render(this.props.eventTypes);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		let tableContent = "";
		let filterBar = "";
		if (this.props.eventTypeAttributes && this.props.events) {
			tableContent = this.loadTableContent();
			if (this.props.eventTypeAttributes.value) {
				filterBar = this.loadFilterBar();
			}
		}
		return (
			<div>
				{filterBar}
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
	eventTypes: config.backendRESTRoute + `/entity/${props.entityId}/eventtypes`,
	lazyEventLoading: eventTypeId => ({
		eventTypeAttributes: config.backendRESTRoute + `/eventtype/${eventTypeId}/attributes`,
		events: config.backendRESTRoute + `/entity/${props.entityId}/eventtype/${eventTypeId}/events/0/10000`
	}),
}))(EventTable);
