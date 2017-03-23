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
            validationResult: '',
            errorMessage: '',
        };
        this.nextAttributeId = 3;
        this.handleChangeEventTypeName = this.handleChangeEventTypeName.bind(this);
        this.handleChangeAttributeName = this.handleChangeAttributeName.bind(this);
        this.handleChangeAttributeType = this.handleChangeAttributeType.bind(this);
        this.handleChangeQuery = this.handleChangeQuery.bind(this);
        this.handleSaveQuery = this.handleSaveQuery.bind(this);
        this.handleSaveQuerySuccess = this.handleSaveQuerySuccess.bind(this);
        this.handleSaveQueryError = this.handleSaveQueryError.bind(this);
    }

    static getDefaultQuery() {
        return "INSERT INTO TestErrorEvents SELECT timestamp, productId, productFamilyId FROM FeedbackData";
    }

    componentDidMount() {
        this.setState({ eventQuery: QueryInterface.getDefaultQuery() });
    }

    addEmptyAttribute(attributes) {
        attributes = attributes.concat([{
            'id': this.nextAttributeId,
            "name": "",
            "type": "",
            "readonly": false
        }]);
        this.nextAttributeId = this.nextAttributeId + 1;
        return attributes;
    }

    getEventType() {
        const eventTypeAttributes = {};
        const attributes = this.state.eventTypeAttributes;
        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i].name) {
                eventTypeAttributes[attributes[i].name] = attributes[i].type;
            }
        }
        const eventType = {
            'name': this.state.eventTypeName,
            'timestamp': 'timestamp',
            'attributes': eventTypeAttributes
        };
        return eventType;
    }

    getEventTypeAttribute(id) {
        return this.state.eventTypeAttributes.find((attribute) => {
            return attribute.id === id;
        });
    }

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
        else if (currentIndex === attributes.length - 1) {
            attributes = this.addEmptyAttribute(attributes);
        }
        this.setState({ eventTypeAttributes: attributes });
    }

    handleChangeAttributeType(id, type) {
        const currentAttribute = this.getEventTypeAttribute(id);
        if (currentAttribute.readonly) {
            return;
        }

        const attributes = this.state.eventTypeAttributes;
        const currentIndex = attributes.indexOf(currentAttribute);
        attributes[currentIndex].type = type;
        this.setState({ eventTypeAttributes: attributes });
    }

    handleChangeQuery(event) {
        this.setState({ eventQuery: event.target.value });
    }

    handleSaveQuery() {
        const eventType = this.getEventType();
        this.props.dataSender.createEventtype(this.state.eventQuery, eventType, this.handleSaveQuerySuccess, this.handleSaveQueryError);
    }

    handleSaveQuerySuccess() {
        $('#query-interface-modal').modal('hide');
    }

    handleSaveQueryError(error) {
        this.setState({ errorMessage: error });
    }

    render() {
        return (
            <div className="query-interface">
                <Modal title="Query Interface" onSave={this.handleSaveQuery}>
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
                    <p className="error-message">{this.state.errorMessage}</p>
                </Modal>
            </div>
        );
    }
} export default QueryInterface;