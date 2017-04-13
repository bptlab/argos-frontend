import React, { Component } from 'react';
import {argosConfig} from './../../../config/argosConfig';
import ConfirmOverlay from "../../../Utils/ConfirmOverlay/ConfirmOverlay";

class EventTypes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {
                errorCode: null,
                errorMessage: null
            },
            eventTypes: []
        };
        //function binding
        this.receiveEventTypes = this.receiveEventTypes.bind(this);
        this.receiveError = this.receiveError.bind(this);
        this.fetchEventTypes = this.fetchEventTypes.bind(this);
        this.handleDeleteEventType = this.handleDeleteEventType.bind(this);
        this.deletionSuccessful = this.deletionSuccessful.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.settingsVisible) {
            this.fetchEventTypes();
            nextProps.dataSource.notificationService.subscribe("EventType", this.fetchEventTypes.bind(this));
        } else if(!nextProps.settingsVisible) {
            this.props.dataSource.notificationService.unsubscribe("EventType", this.fetchEventTypes.bind(this));
        }
    }
    
    receiveEventTypes(eventTypes) {
        this.setState({
            eventTypes: eventTypes
        });
    }
    
    receiveError(errorMessage, errorCode) {
        this.setState({
            error: {
                errorCode: errorCode,
                errorMessage: errorMessage
            }
        });
    }
    
    fetchEventTypes() {
        this.props.dataSource.fetchAllEventTypes(this.receiveEventTypes, this.receiveError);
    }
    
    deletionSuccessful() {
        this.fetchEventTypes();
    }

    handleDeleteEventType(eventType) {
        $("#delete-prompt-modal").modal('hide');
        this.props.dataSender.deleteEventType(eventType, this.deletionSuccessful, this.receiveError);
    }

    /* istanbul ignore next */
    handleAbortDelete() {
        $("#delete-prompt-modal").modal('hide');
    }
    
    matchError() {
        const errorCode = this.state.error.errorCode;
        const errorMessage = this.state.error.errorMessage;
        if(errorCode) {
            switch(errorCode) {
                case 403: {
                    return argosConfig.errorMessage403;
                }
                case 500: {
                    return argosConfig.errorRemainingDependencies + "<br/>Dependent eventTypes: " + errorMessage;
                }
                default:
                    return argosConfig.RESTInterfaceConnectionError;
            }
        } else {
            return "";
        }
    }

    render() {
        const errorMessage = this.matchError();
        const lineElements = [];
        this.state.eventTypes.forEach((eventType) => {
            const deleteCallback = this.handleDeleteEventType.bind(this, eventType);
            const abortCallback = this.handleAbortDelete.bind(this);
            lineElements.push(
                <tr key={eventType.id}>
                    <td>{eventType.id}</td>
                    <td>{eventType.name}</td>
                    <td>{eventType.eventQuery}</td>
                    <td className="center">
                        <a className="nav-link" data-toggle="modal" data-target="#delete-prompt-modal">
                            <i className="fa fa-trash" />
                        </a>
                        <ConfirmOverlay title="Delete Event Type?" onAbort={abortCallback} onSubmit={deleteCallback}
                                        id="delete-prompt" abortButtonText="Abort" submitButtonText="Submit">
                            {argosConfig.confirmEventTypeDeletion}
                        </ConfirmOverlay>
                    </td>
                </tr>
            );
        });
        
        return (
            <div className="event-types-settings">
                {errorMessage && 
                    (<div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>)
                }
                <table className="table table-striped event-types-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Query</th>
                            <th className="center">
                                {argosConfig.tableHeaderDescriptionDelete}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lineElements}
                    </tbody>
                </table>
                <p>{argosConfig.eventTypeAddHint}</p>
            </div>
        );
    }
}
export default EventTypes;