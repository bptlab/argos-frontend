import RemoteHandler from './RemoteHandler.js';

class DataTransmitter extends RemoteHandler {

    constructor(remoteAddress, remotePort, notificationCallback) {
        super(remoteAddress, remotePort, notificationCallback);
        this.requestMethod = 'POST';
        document.addEventListener('dataSended', this.receiveResults);
    }

    static getAPIRouteForCreateEventtype() {
        return "api/eventtypes/create";
    }
    
    static getAPIRouteForDeleteEventType() {
        return "/api/eventtypes/delete/{0}";
    }

    static convertToJson(data, errorCallback) {
        try {
            return JSON.stringify(data);
        }
        catch(e) {
            errorCallback(e);
        }
    }

    createEventtype(eventQuery, eventType, successCallback, errorCallback) {
        const APIRoute = DataTransmitter.getAPIRouteForCreateEventtype();
        const URI = DataTransmitter.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
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
        const URI = DataTransmitter.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    () => {/* Not necessary because no data mapping is needed. */},
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, "DELETE", callbackContainer, null);
    }
}
export default DataTransmitter;