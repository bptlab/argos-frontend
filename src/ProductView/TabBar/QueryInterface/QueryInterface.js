import React, { Component } from 'react';
import Modal from '../../../Utils/Modal/Modal.js';
import QueryInterfaceAttributeList from './QueryInterfaceAttributeList/QueryInterfaceAttributeList.js';

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

    buildJSONSerializableDataContainer() {
        const eventTypeAttributes = {};
        const attributes = this.state.eventTypeAttributes;
        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i].name) {
                // Unicorn explicitly requires a map of event types in this format: {EventTypeName: EventTypeType}
                eventTypeAttributes[attributes[i].name] = attributes[i].type;
            }
        }
        return {
            'name': this.state.eventTypeName,
            'timestamp': 'timestamp',
            'attributes': eventTypeAttributes
        };
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
        const eventType = this.buildJSONSerializableDataContainer();
        this.props.dataSender.createEventtype(
            this.state.eventQuery,
            eventType,
            this.handleSaveQuerySuccess,
            this.handleSaveQueryError
        );
    }
    /* istanbul ignore next */
    handleSaveQuerySuccess() {
        /* istanbul ignore next */
        $('#query-interface-modal').modal('hide');
    }

    handleSaveQueryError(error) {
        this.setState({ errorMessage: error });
    }

    render() {
        return (
            <div className="query-interface">
                <a className="nav-link" data-toggle="modal" data-target="#query-interface-modal">
                    <i className="fa fa-plus"/>
                </a>
                <Modal title="Query Interface" onSubmit={this.handleSaveQuery} id="query-interface" buttonText="Save">
                    {this.state.errorMessage && <div className="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>}
                    <QueryInterfaceAttributeList eventTypeName={this.state.eventTypeName}
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
                </Modal>
            </div>
        );
    }
} export default QueryInterface;