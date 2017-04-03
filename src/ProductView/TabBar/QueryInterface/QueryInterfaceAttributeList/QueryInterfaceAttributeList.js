import React, { Component } from 'react';
import QueryInterfaceAttribute from './QueryInterfaceAttribute/QueryInterfaceAttribute.js';
import {argosConfig} from './../../../../config/argosConfig.js';

class QueryInterfaceAttributeList extends Component {
    constructor(props) {
        super(props);
        this.onChangeEventTypeName = this.onChangeEventTypeName.bind(this);
        this.state = {
            validationClasses: 'has-danger'
        };
    }

    onChangeEventTypeName (event) {
        this.props.onChangeEventTypeName(event.target.value);
        this.queryNameFormValidation(event.target.value);
    }

    queryNameFormValidation (queryName) {
        if (!queryName) {
            this.setState({ validationClasses: 'has-danger' });
        }
        else {
            this.setState({ validationClasses: '' });
        }
    }

    render() {
        return (
            <div className="query-interface-header">
                <div className={`form-group ` + this.state.validationClasses}>
                    <input className="form-control" type="text"
                           placeholder="Name" id="query-name"
                           value={this.props.eventTypeName}
                           onChange={this.onChangeEventTypeName}/>
                    {this.state.validationClasses &&
                    <div className="form-control-feedback">
                        {argosConfig.formValidationNoEmptyMessage}
                    </div>}
                </div>
                {this.props.eventTypeAttributes.map((eventTypeAttribute) =>
                    <QueryInterfaceAttribute key={eventTypeAttribute.id}
                                               eventTypeAttribute={eventTypeAttribute}
                                               onChangeAttributeName={this.props.onChangeAttributeName}
                                               onChangeAttributeType={this.props.onChangeAttributeType}/>
                )}
            </div>
        );
    }
} export default QueryInterfaceAttributeList;
