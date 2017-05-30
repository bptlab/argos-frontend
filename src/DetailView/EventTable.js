import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";

class EventTable extends Component {

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
									className="capitalize"
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
					return this.composeTableRow(event, key);
				})}
			</TableBody>
		);
	}

	render() {
		return (
			<div>
				<Table>
					{this.composeTableHeader(this.props.eventTypeAttributes)}
					{this.composeTableBody(this.props.events)}
				</Table>
			</div>
		);
	}
}

export default EventTable;
