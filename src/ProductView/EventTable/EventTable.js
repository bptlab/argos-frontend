import React, { Component } from 'react';
import './EventTable.css';
import EventTableHeader from './EventTableHeader/EventTableHeader.js';
import EventTableRow from './EventTableRow/EventTableRow.js';

class EventTable extends Component {


    searchMatches(event) {
        for(let i = 0; i < this.props.filter.length; i++) {
            if (!this.testFilter(event, this.props.filter[i])) {
                return false;
            }
        }
        return true;
    }

    testFilter(event, filter) {
        if (!this.props.filter[0].value) {
            return true;
        }
        for(let i = 0; i < this.props.eventTable.header.length; i++) {
            if (event[this.props.eventTable.header[i].name].toString().toLowerCase().indexOf(filter.value.toLowerCase()) > -1) {
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <EventTableHeader eventTypeAttributes={this.props.eventTable.header}/>
                    <tbody>
                    {this.props.eventTable.events.map((event, index) => {
                        if(this.searchMatches(event)) {
                            return (<EventTableRow key={index} id={index} event={event} eventTypeAttributes={this.props.eventTable.header}/>);
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
