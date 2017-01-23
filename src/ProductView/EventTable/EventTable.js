import React, { Component } from 'react';
import './EventTable.css';
import EventTableHeader from './EventTableHeader/EventTableHeader.js';
import EventTableRow from './EventTableRow/EventTableRow.js';

class EventTable extends Component {
    render() {
        return (
            <table className="table">
                <EventTableHeader eventTypeAttributes={this.props.eventTable.header}/>
                <tbody>
                    {this.props.eventTable.events.map((event, index) =>
                        <EventTableRow key={index} id={index} event={event} eventTypeAttributes={this.props.eventTable.header}/>
                    )}
                </tbody>
            </table>
        );
    }
}

export default EventTable;
