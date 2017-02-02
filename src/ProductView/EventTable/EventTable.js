import React, { Component } from 'react';
import './EventTable.css';
import EventTableHeader from './EventTableHeader/EventTableHeader.js';
import EventTableRow from './EventTableRow/EventTableRow.js';

class EventTable extends Component {


    testFilter(event) {
        // every is equivalent to logical and over an array
        return this.props.filter.every((filter) => {
            return this.testFilterArguments(event, filter);
        });
    }

    testFilterArguments(event, currentFilter) {
        if (!currentFilter.value) {
            return true;
        }
        // double negation to construct an logical or
        return !this.props.eventTable.header.every((attribute) => {
            return !(event[attribute.name].toString().toLowerCase()
                .indexOf(currentFilter.value.toString().toLowerCase()) > -1);
        });
    }

    render() {
        return (
            <div className="container event-table-container">
                <table className="table">
                    <EventTableHeader eventTypeAttributes={this.props.eventTable.header}/>
                    <tbody>
                    {this.props.eventTable.events.map((event, index) => {
                        if(this.testFilter(event)) {
                            return (
                                <EventTableRow key={index} id={index} event={event}
                                               eventTypeAttributes={this.props.eventTable.header}/>
                            );
                        } else {
                            return false;
                        }
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EventTable;
