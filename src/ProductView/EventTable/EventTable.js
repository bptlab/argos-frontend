import React, { Component } from 'react';
import EventTableHeader from './EventTableHeader/EventTableHeader.js';
import EventTableRow from './EventTableRow/EventTableRow.js';

class EventTable extends Component {
    
    testFilter(currentEvent) {
        // every is equivalent to logical and over an array
        return this.props.filter.every((filter) => {
            return this.testFilterArguments(currentEvent, filter);
        });
    }

    testFilterArguments(currentEvent, currentFilter) {
        if (!currentFilter.value) {
            return true;
        }
        return this.props.header.some((eventPropertyKey) => {
            const eventPropertyValue = currentEvent[eventPropertyKey.name].toString().toLowerCase();
            const searchQuery = currentFilter.value.toString().toLowerCase();
            return (eventPropertyValue.indexOf(searchQuery) > -1);
        });
    }

    render() {
        return (
            <div className="container event-table-container">
                <table className="table">
                    <EventTableHeader eventTypeAttributes={this.props.header}/>
                    <tbody>
                    {this.props.events.map((event, index) => {
                        if(this.testFilter(event)) {
                            return (
                                <EventTableRow 
                                    key={index} 
                                    id={index} 
                                    event={event}
                                    eventTypeAttributes={this.props.header}/>
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
} export default EventTable;
