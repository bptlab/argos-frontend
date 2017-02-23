import React, { Component } from 'react';

class QueryInterfaceHeaderAttribute extends Component {
    constructor(props) {
        super(props);
        this.onChangeAttributeName = this.onChangeAttributeName.bind(this);
        this.onChangeAttributeType = this.onChangeAttributeType.bind(this);
    }

    onChangeAttributeName (event) {
        this.props.onChangeAttributeName(this.props.eventTypeAttribute.id, event.target.value);
    }

    onChangeAttributeType (event) {
        this.props.onChangeAttributeType(this.props.eventTypeAttribute.id, event.target.value);
    }

    render() {
        return (
            <div className="query-interface-header-attribute form-group row">
                <div className="col-6">
                    <input className="form-control" type="text" placeholder="Attribute name" id="example-text-input"
                           value={this.props.eventTypeAttribute.name}
                           onChange={this.onChangeAttributeName}/>
                </div>
                <div className="col-6">
                    <select className="form-control" id="exampleSelect1" value={this.props.eventTypeAttribute.type} onChange={this.onChangeAttributeType}>
                        <option>String</option>
                        <option>Boolean</option>
                        <option>Integer</option>
                        <option>Float</option>
                    </select>
                </div>
            </div>
        );
    }
} export default QueryInterfaceHeaderAttribute;
