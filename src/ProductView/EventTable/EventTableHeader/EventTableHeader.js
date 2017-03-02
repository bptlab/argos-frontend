import React, { Component } from 'react';
import {argosConfig} from '../../../config/argosConfig';

class EventTableHeader extends Component {
    
    render() {
        return (
            <thead className="event-table-header thead">
                <tr>
                    <th>{argosConfig.enumerationSymbol}</th>
                    {this.props.eventTypeAttributes.map((eventTypeAttribute, index) =>
                        <th key={index}>{eventTypeAttribute.name}</th>
                    )}
                </tr>
            </thead>
        );
    }
}
export default EventTableHeader;
