import React, { Component } from 'react';
import QueryInterfaceHeaderAttribute from './QueryInterfaceHeaderAttribute/QueryInterfaceHeaderAttribute.js';

class QueryInterfaceHeader extends Component {
    render() {
        return (
            <div className="query-interface-header">
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="Name" id="query-name"/>
                </div>
                {this.props.eventTypeAttributes.map((eventTypeAttribute, index) =>
                    <QueryInterfaceHeaderAttribute key={eventTypeAttribute.id}
                                                   eventTypeAttribute={eventTypeAttribute}
                                                   onChangeAttributeName={this.props.onChangeAttributeName}
                                                   onChangeAttributeType={this.props.onChangeAttributeType}/>
                )}
            </div>
        );
    }
} export default QueryInterfaceHeader;
