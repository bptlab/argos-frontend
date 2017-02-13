import React, { Component } from 'react';

class EventTableRow extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                {this.props.eventTypeAttributes.map((eventTypeAttribute, index) =>
                    <td key={index}>
                        {this.props.event[eventTypeAttribute.name]}
                    </td>
                )}
            </tr>
        );
    }
}
export default EventTableRow;
