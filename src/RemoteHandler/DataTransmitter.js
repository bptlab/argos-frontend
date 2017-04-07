import RemoteHandler from './RemoteHandler.js';

class DataTransmitter extends RemoteHandler {

    constructor(remoteAddress, remotePort, notificationCallback) {
        super(remoteAddress, remotePort, notificationCallback);
        this.requestMethod = 'POST';
        document.addEventListener('dataSended', this.receiveResponse);
    }

    static getAPIRouteForCreateEventtype() {
        return "api/eventtypes/create";
    }
    
    static getAPIRouteForDeleteEventType() {
        return "api/eventtypes/delete/{0}";
    }

    static convertToJson(data, errorCallback) {
        try {
            return JSON.stringify(data);
        }
        catch(e) {
            errorCallback(e);
        }
    }

    receiveResponse(event) {
        event.detail.clientSuccessCallback();
    }

    createEventTypeJson(eventTypeName, eventTypeAttributes) {
        const eventTypeAttributeMap = {};
        for (let i = 0; i < eventTypeAttributes.length; i++) {
            if (eventTypeAttributes[i].name) {
                // Unicorn explicitly requires a map of event types in this format: {EventTypeName: EventTypeType}
                eventTypeAttributeMap[eventTypeAttributes[i].name] = eventTypeAttributes[i].type;
            }
        }
        return {
            'name': eventTypeName,
            'timestamp': 'timestamp',
            'attributes': eventTypeAttributeMap
        };
    }

    createEventtype(eventQuery, eventTypeName, eventTypeAttributes, successCallback, errorCallback) {
        const APIRoute = DataTransmitter.getAPIRouteForCreateEventtype();
        const URI = DataTransmitter.getServerRequestURI().format(this.remoteAddress, APIRoute);
        const eventType = this.createEventTypeJson(eventTypeName, eventTypeAttributes);
        const data = {
            "eventQuery":   eventQuery,
            "eventType":    eventType
        };
        const callbackContainer = {
            "dataMappingFunction":    () => {/* Not necessary because no data mapping is needed. */},
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        const jsonData = DataTransmitter.convertToJson(data, errorCallback);
        this.client.addRequest(URI, this.requestMethod, callbackContainer, jsonData);
    }
    
    deleteEventType(eventType, successCallback, errorCallback) {
        const APIRoute = DataTransmitter.getAPIRouteForDeleteEventType().format(eventType.id);
        const URI = DataTransmitter.getServerRequestURI().format(this.remoteAddress, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    () => {/* Not necessary because no data mapping is needed. */},
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, "DELETE", callbackContainer, null);
    }
}
export default DataTransmitter;