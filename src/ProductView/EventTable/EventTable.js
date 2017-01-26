import React, { Component } from 'react';
import './EventTable.css';
import EventTableHeader from './EventTableHeader/EventTableHeader.js';
import EventTableRow from './EventTableRow/EventTableRow.js';

class EventTable extends Component {


    searchMatches(event) {
        if (!this.props.filter[0].value) {
            return true;
        }
        //SEARCH-CONFIG: Edit this to define relevant fields for overview search
        const searchFields = this.props.eventTable.header;

        for(const index in searchFields) {
            if (searchFields[index].toString().indexOf(this.props.filter[0].value) > -1) {
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
