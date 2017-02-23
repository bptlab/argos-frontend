import React, { Component } from 'react';
import Modal from './Modal/Modal.js';
import QueryInterfaceHeader from './QueryInterfaceHeader/QueryInterfaceHeader.js';

class QueryInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventTypeName: '',
            eventTypeAttributes: [
                {
                    "id": 0,
                    "name": "timestamp",
                    "type": "Date",
                    "editable": false
                },
                {
                    "id": 1,
                    "name": "productId",
                    "type": "Integer",
                    "editable": false
                },
                {
                    "id": 2,
                    "name": "productFamilyId",
                    "type": "String",
                    "editable": false
                }
            ],
            eventQuery: '',
            validationResult: ''
        };
        this.handleChangeAttributeName = this.handleChangeAttributeName.bind(this);
        this.handleChangeAttributeType = this.handleChangeAttributeType.bind(this);
        this.handleChangeQuery = this.handleChangeQuery.bind(this);
        this.handleSaveQuery = this.handleSaveQuery.bind(this);
    }

    componentDidMount() {
        this.setState({ query: this.props.defaultQuery });
    }

    handleChangeAttributeName(id, name) {
        let attributes = this.state.eventTypeAttributes;
        for (let i = 0; i < this.state.eventTypeAttributes.length; i++) {
            if (attributes[i].id === id && attributes[i].editable === true) {
                attributes[i].name = name;
                this.setState({ eventTypeAttributes: attributes });
            }
        }
    }

    handleChangeAttributeType(id, type) {
        let attributes = this.state.eventTypeAttributes;
        for (let i = 0; i < this.state.eventTypeAttributes.length; i++) {
            if (attributes[i].id === id && attributes[i].editable === true) {
                attributes[i].type = type;
                this.setState({ eventTypeAttributes: attributes });
            }
        }
    }

    handleChangeQuery(event) {
        this.setState({ query: event.target.value });
    }

    handleSaveQuery() {
        try {
            this.validateEventType();
            this.validateQuery();
        }
        catch (e) {
            return this.setState({ validationResult: e });
        }
        let attributes = {};
        for (let i = 0; i < this.state.eventTypeAttributes.length; i++) {
            if (!this.state.eventTypeAttributes[i].name == ''){
                attributes[this.state.eventTypeAttributes[i].name] = this.state.eventTypeAttributes[i].type;
            }
        }
        let eventType = {
            'name': this.state.eventTypeName,
            'timestamp': 'timestamp',
            'attributes': attributes
        };
        this.props.dataSource.createEventtype(this.state.eventQuery, eventType, this.handleEventTypeData, this.handleError);
    }

    validateEventType() {
    }

    validateQuery() {
        let insertInto = /\s+INSERT\s+INTO\s+(\w*)/i;
        let match = insertInto.exec(this.state.eventQuery);
        console.log(match[1]);
        if (match[1] != this.state.eventTypeName) {
            throw '"' + match[1] + '" has to match the EventType name.';
        }
    }

    render() {
        return (
            <div className="query-interface">
                <Modal title="Create new query" onSave={this.handleSaveQuery}>
                    <QueryInterfaceHeader/>
                    <div className="form-group">
                        <label htmlFor="event-query" className="form-control-label">Event Query</label>
                        <textarea type="text" className="form-control" id="event-query" rows="8" value={this.state.query} onChange={this.handleChangeQuery}/>
                    </div>
                    <p>{this.state.errors}</p>
                </Modal>
            </div>
        );
    }
} export default QueryInterface;