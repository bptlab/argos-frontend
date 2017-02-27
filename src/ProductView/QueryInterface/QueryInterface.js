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
                    "name": "productId",
                    "type": "INTEGER",
                    "readonly": true
                },
                {
                    "id": 1,
                    "name": "productFamilyId",
                    "type": "STRING",
                    "readonly": true
                },
                {
                    "id": 2,
                    "name": "",
                    "type": "",
                    "readonly": false
                }
            ],
            eventQuery: '',
            validationResult: ''
        };
        this.handleChangeEventTypeName = this.handleChangeEventTypeName.bind(this);
        this.handleChangeAttributeName = this.handleChangeAttributeName.bind(this);
        this.handleChangeAttributeType = this.handleChangeAttributeType.bind(this);
        this.handleChangeQuery = this.handleChangeQuery.bind(this);
        this.handleSaveQuery = this.handleSaveQuery.bind(this);
    }

    componentDidMount() {
        this.setState({ eventQuery: this.props.defaultQuery });
    }

    addEmptyAttribute(attributes) {
        attributes = attributes.concat([{
            'id': attributes.length,
            "name": "",
            "type": "",
            "readonly": false
        }]);
        return attributes;
    }

        const attributes = this.state.eventTypeAttributes;
        for (let i = 0; i < this.state.eventTypeAttributes.length; i++) {
            if (attributes[i].id === id && attributes[i].readonly === false) {
                attributes[i].type = type;
                this.setState({ eventTypeAttributes: attributes });
            }
        }
    }

    handleChangeQuery(event) {
        this.setState({ query: event.target.value });
    getEventTypeAttribute(id) {
        return this.state.eventTypeAttributes.find((attribute) => {
            return attribute.id === id;
        });
    }

    handleSaveQuery() {
        try {
            this.validateEventType();
            this.validateQuery();
    handleChangeEventTypeName(name) {
        this.setState({ eventTypeName: name });
    }

    handleChangeAttributeName(id, name) {
        const currentAttribute = this.getEventTypeAttribute(id);
        if (currentAttribute.readonly) {
            return;
        }

        let attributes = this.state.eventTypeAttributes;
        const currentIndex = attributes.indexOf(currentAttribute);
        attributes[currentIndex].name = name;

        if (!name) {
            attributes.splice(currentIndex, 1);
        }
        if (currentIndex === attributes.length - 1) {
            attributes = this.addEmptyAttribute(attributes);
        }
        this.setState({ eventTypeAttributes: attributes });
    }

    validateEventType() {
    handleChangeAttributeType(id, type) {
        const currentAttribute = this.getEventTypeAttribute(id);
        if (currentAttribute.readonly) {
            return;
        }

        let attributes = this.state.eventTypeAttributes;
        const currentIndex = attributes.indexOf(currentAttribute);
        attributes[currentIndex].type = type;
        this.setState({ eventTypeAttributes: attributes });
    }

    validateQuery() {
        const insertInto = /\s+INSERT\s+INTO\s+(\w*)/i;
        const match = insertInto.exec(this.state.eventQuery);
        if (match[1] !== this.state.eventTypeName) {
            throw '"' + match[1] + '" has to match the EventType name.';
        }
    handleChangeQuery(event) {
        this.setState({ eventQuery: event.target.value });
    }

    render() {
        return (
            <div className="query-interface">
                <Modal title="Create new query" onSave={this.handleSaveQuery}>
                    <QueryInterfaceHeader eventTypeName={this.state.eventTypeName}
                                          onChangeEventTypeName={this.handleChangeEventTypeName}
                                          eventTypeAttributes={this.state.eventTypeAttributes}
                                          onChangeAttributeName={this.handleChangeAttributeName}
                                          onChangeAttributeType={this.handleChangeAttributeType} />
                    <div className="form-group">
                        <label htmlFor="event-query" className="form-control-label">Event Query</label>
                        <textarea type="text" className="form-control"
                                  id="event-query" rows="8"
                                  value={this.state.eventQuery}
                                  onChange={this.handleChangeQuery}/>
                    </div>
                    <p>{this.state.validationResult}</p>
                </Modal>
            </div>
        );
    }
} export default QueryInterface;