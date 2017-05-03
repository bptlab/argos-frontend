import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class EventTable extends Component {
	composeTableHeader(eventTypeAttributes) {
		return (
			<TableHeader
				displaySelectAll={false}
				adjustForCheckbox={false}>
				<TableRow>
                    {eventTypeAttributes.map(
                        (attribute) => {
                            return (<TableRowColumn>{attribute.name}</TableRowColumn>);
                        })
                    }
				</TableRow>
			</TableHeader>
		);
	}

	composeTableRow(event) {
		let row = Object.keys(event).map(
            (key) => {return (<TableRowColumn>{event[key]}</TableRowColumn>);});
		return (<TableRow>{row}</TableRow>);
	}

	composeTableBody(events) {
		return (
			<TableBody displayRowCheckbox={false}>
				{events.map((event) => this.composeTableRow(event))}
			</TableBody>
		);
	}

	render() {
		return (
			<Table>
				{this.composeTableHeader([
                    {
                        name: "id",
                        type: "int"
                    }, {
						name: "name",
						type: "string"
					}, {
                        name: "employed",
                        type: "string"
                    }
				])}
				{this.composeTableBody(
					[
						{id: "1", name: "John Smith", employed: "Employed"},
                        {id: "2", name: "Stephanie Sanders", employed: "Unemployed"}
					]
				)}
			</Table>
		);
	}
}

export default EventTable;