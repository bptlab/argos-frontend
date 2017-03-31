import React, { Component } from 'react';
import Modal from '../../../Utils/Modal/Modal.js';
import QueryInterfaceAttributeList from './QueryInterfaceAttributeList/QueryInterfaceAttributeList.js';
import {argosConfig} from './../../../config/argosConfig.js';

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
            eventQuery: argosConfig.createEventTypeDefaultQuery,
            errorMessage: '',
            validationClasses: '',
            modalLoading: false,
            modalIsAbleToSave: false
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

    componentDidMount() {
        $('#new-complex-eventtype').tooltip();
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



    getEventTypeAttribute(id) {
        return this.state.eventTypeAttributes.find((attribute) => {
            return attribute.id === id;
        });
    }

    handleChangeEventTypeName(name) {
        const modalIsAbleToSave = this.queryIsSafeable(name, this.state.eventQuery);
        this.setState({ eventTypeName: name, modalIsAbleToSave: modalIsAbleToSave });
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
        const queryValue = event.target.value;
        const modalIsAbleToSave = this.queryIsSafeable(this.state.eventTypeName, queryValue);
        this.setState({ eventQuery: queryValue, modalIsAbleToSave: modalIsAbleToSave });
        this.eventQueryFormValidation(queryValue);
    }

    queryIsSafeable(eventTypeName, eventQuery) {
        return eventTypeName && eventQuery;
    }

    handleSaveQuery() {
        this.setState({ modalLoading: true });
        this.props.dataSender.createEventtype(
            this.state.eventQuery,
            this.state.eventTypeName,
            this.state.eventTypeAttributes,
            this.handleSaveQuerySuccess,
            this.handleSaveQueryError
        );
    }
    /* istanbul ignore next */
    handleSaveQuerySuccess() {
        $('#query-interface-modal').modal('hide');
        this.setState({ modalLoading: false });
    }

    handleSaveQueryError(error) {
        this.setState({ errorMessage: error, modalLoading: false });
    }

    eventQueryFormValidation (queryName) {
        if (!queryName) {
            this.setState({ validationClasses: 'has-danger' });
        }
        else {
            this.setState({ validationClasses: '' });
        }
    }

    render() {
        return (
            <div className="query-interface">
                <a id="new-complex-eventtype" className="nav-link" data-toggle="modal"
                   data-target="#query-interface-modal" title={argosConfig.eventQueryInterfaceTooltip}
                   data-placement="top">
                    <i className="fa fa-plus"/>
                </a>
                <Modal title="Query Interface"
                       onSubmit={this.handleSaveQuery}
                       id="query-interface"
                       buttonText="Save"
                       loading={this.state.modalLoading}
                       isAbleToSave={this.state.modalIsAbleToSave}>
                    {this.state.errorMessage && <div className="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>}
                    <QueryInterfaceAttributeList eventTypeName={this.state.eventTypeName}
                                                 onChangeEventTypeName={this.handleChangeEventTypeName}
                                                 eventTypeAttributes={this.state.eventTypeAttributes}
                                                 onChangeAttributeName={this.handleChangeAttributeName}
                                                 onChangeAttributeType={this.handleChangeAttributeType} />
                    <div className={`form-group ` + this.state.validationClasses}>
                        <label htmlFor="event-query" className="form-control-label">Event Query</label>
                        <textarea type="text" className="form-control"
                                  id="event-query" rows="8"
                                  value={this.state.eventQuery}
                                  onChange={this.handleChangeQuery}/>
                        {this.state.validationClasses &&
                        <div className="form-control-feedback">
                            {argosConfig.formValidationNoEmptyMessage}
                        </div>}
                    </div>
                </Modal>
            </div>
        );
    }
} export default QueryInterface;