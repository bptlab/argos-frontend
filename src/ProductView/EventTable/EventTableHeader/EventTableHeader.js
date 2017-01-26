import React, { Component } from 'react';
import './EventTableHeader.css';

class EventTableHeader extends Component {
    render() {
        return (
            <thead className="event-table-header thead">
                <tr>
                    <th>#</th>
                    {this.props.eventTypeAttributes.map((eventTypeAttribute, index) =>
                        <th key={index}>{eventTypeAttribute.name}</th>
                    )}
                </tr>
            </thead>
        );
    }
}

export default EventTableHeader;
