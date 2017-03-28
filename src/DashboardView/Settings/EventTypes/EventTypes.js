import React, { Component } from 'react';
import {argosConfig} from './../../../config/argosConfig';

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
        this.delteEventType = this.delteEventType.bind(this);
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

    delteEventType(eventType) {
        this.props.dataSender.deleteEventType(eventType, this.deletionSuccessful, this.receiveError);
    }

    render() {
        let errorMessage = "";
        if(this.state.error.errorCode) {
            switch(this.state.error.errorCode) {
                case 403: {
                    errorMessage = argosConfig.errorMessage403;
                    break;
                }
                case 500: {
                    errorMessage = argosConfig.errorRemainingDependencies;
                    errorMessage += "<br/>Dependent eventTypes: " + this.state.error.errorMessage;
                    break;
                }
                default:
                    errorMessage = argosConfig.RESTInterfaceConnectionError;
            }
        }
        const lineElements = [];
        this.state.eventTypes.forEach((eventType) => {
            lineElements.push(
                <tr key={eventType.id}>
                    <td>{eventType.id}</td>
                    <td>{eventType.name}</td>
                    <td>{eventType.eventQuery}</td>
                    <td className="center">
                        <i className="fa fa-trash" onClick={this.delteEventType.bind(this, eventType)} />
                    </td>
                </tr>
            );
        });
        
        return(
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
                        <th className="center">{argosConfig.tableHeaderDescriptionDelete}</th>
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