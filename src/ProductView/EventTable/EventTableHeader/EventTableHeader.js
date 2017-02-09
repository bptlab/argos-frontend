import React, { Component } from 'react';

class EventTableHeader extends Component {
    
    static getEnumerationSymbol() {
        return "#";
    }
    
    render() {
        return (
            <thead className="event-table-header thead">
                <tr>
                    <th>{EventTableHeader.getEnumerationSymbol()}</th>
                    {this.props.eventTypeAttributes.map((eventTypeAttribute, index) =>
                        <th key={index}>{eventTypeAttribute.name}</th>
                    )}
                </tr>
            </thead>
        );
    }
}
export default EventTableHeader;
