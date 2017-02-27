import React, { Component } from 'react';
import QueryInterfaceHeaderAttribute from './QueryInterfaceHeaderAttribute/QueryInterfaceHeaderAttribute.js';

class QueryInterfaceHeader extends Component {
    constructor(props) {
        super(props);
        this.onChangeEventTypeName = this.onChangeEventTypeName.bind(this);
    }

    onChangeEventTypeName (event) {
        this.props.onChangeEventTypeName(event.target.value);
    }

    render() {
        return (
            <div className="query-interface-header">
                <div className="form-group">
                    <input className="form-control" type="text"
                           placeholder="Name" id="query-name"
                           value={this.props.eventTypeName}
                           onChange={this.onChangeEventTypeName}/>
                </div>
                {this.props.eventTypeAttributes.map((eventTypeAttribute) =>
                    <QueryInterfaceHeaderAttribute key={eventTypeAttribute.id}
                                                   eventTypeAttribute={eventTypeAttribute}
                                                   onChangeAttributeName={this.props.onChangeAttributeName}
                                                   onChangeAttributeType={this.props.onChangeAttributeType}/>
                )}
            </div>
        );
    }
} export default QueryInterfaceHeader;
