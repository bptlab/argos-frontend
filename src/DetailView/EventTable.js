import React, { Component } from 'react';
import {connect, PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import EventTabs from './EventTabs';
import AppStyles from './../AppStyles';

class EventTable extends ConnectionComponent {
    composeTableHeader(eventTypeAttributes) {
        return (
			<TableHeader
				displaySelectAll={false}
				adjustForCheckbox={false}>
				<TableRow>
                    {eventTypeAttributes.map(
                        (attribute) => {
                            return (<TableHeaderColumn>{attribute.name}</TableHeaderColumn>);
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
        const allFetches = PromiseState.all([this.props.eventTypes]);
        const eventTypes = this.props.eventTypes.value;
        const connectionIncomplete = super.render(allFetches);
        if(connectionIncomplete) {
            return connectionIncomplete;
        }
        return (
			<div>
				<EventTabs
					eventTypes={eventTypes}
					styles={[AppStyles.elementMarginTop]} />
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
			</div>
        );
    }
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    eventTypes: `/entity/${props.entityId}/eventtypes`,
}))(EventTable);
