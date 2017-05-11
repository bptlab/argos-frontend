import React from "react";
import {connect, PromiseState} from "react-refetch";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
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

		this.handleFilterChange = this.handleFilterChange.bind(this);
	}

	componentWillReceiveProps(props) {
		if (props.eventType && this.props.eventType !== props.eventType) {
			this.setState({
				filter: []
			});
			this.props.lazyEventLoading(props.eventType.Id);

		}
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
		const filteredEvents = this.getFilteredEvents(events);
		this.props.onEventsChange(filteredEvents);
		return (
			<TableBody displayRowCheckbox={false}>
				{filteredEvents.map((event, key) => {
					return this.composeTableRow(event, key);
				})}
			</TableBody>
		);
	}

	getFilteredEvents(events) {
		return events.filter(event =>
			this.isCoveredByFilter(event));
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
			columnsToBeSearched = columnsToBeSearched.filter((column) => {
				return EventTable.doesContain(column.Name, filter.column);
			});
		}

		return columnsToBeSearched.some((column) => {
			return this.testColumn(column, event, filter);
		});
	}

	testColumn(column, event, filter) {
		const filterValues = filter.value.split(",");
		const eventAttribute = event.Attributes.find(attribute => attribute.Name === column.Name);
		return filterValues.some(filterValue => {
			const currentFilterValue = filterValue.trim();
			return (currentFilterValue &&  EventTable.doesContain(eventAttribute.Value, currentFilterValue));
		});
	}

	static doesContain(baseValue, subValue) {
		return (baseValue.toString().toLowerCase().indexOf(subValue.toString().toLowerCase()) > -1);
	}

	handleFilterChange(filter) {
		this.setState({
			filter: filter,
		});
	}

	render() {
		if (!this.props.eventTypeAttributes || !this.props.events) {
			return <div />;
		}
		const eventFetchingIncomplete = super.render(PromiseState.all([
			this.props.eventTypeAttributes,
			this.props.events]));
		if(eventFetchingIncomplete) {
			return eventFetchingIncomplete;
		}

		let tableContent = "";
		let filterBar = "";
		if (this.props.eventTypeAttributes.value && this.props.events.value) {
			return (
				<div>
					<FilterBar
						styles={[AppStyles.elementMarginTop]}
						onFiltersChange={this.handleFilterChange}
						autoCompleteSource={this.props.eventTypeAttributes.value.map(attributeInfo => attributeInfo.Name)} />
					<Table>
						{this.composeTableHeader(this.props.eventTypeAttributes.value)}
						{this.composeTableBody(this.props.events.value)}
					</Table>
				</div>
			);
		}
		return <div />;
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	lazyEventLoading: eventTypeId => ({
		eventTypeAttributes: config.backendRESTRoute + `/eventtype/${eventTypeId}/attributes`,
		events: config.backendRESTRoute + `/entity/${props.entityId}/eventtype/${eventTypeId}/events/0/10000`
	})
}))(EventTable);
