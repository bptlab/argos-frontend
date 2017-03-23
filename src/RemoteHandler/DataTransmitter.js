import RemoteHandler from './RemoteHandler.js';

class DataTransmitter extends RemoteHandler {

    static getAPIRouteForCreateEventtype() {
        return "api/eventtypes/create";
    }

    convertToJson(data, errorCallback) {
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
        this.client.open('POST', URI, true);
        const data = {
            "eventQuery":   eventQuery,
            "eventType":    eventType
        };
        const callbackContainer = {
            "dataMappingFunction":    () => {/* Not necessary because no data mapping is needed. */},
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        const jsonData = this.convertToJson(data, errorCallback);
        this.client.sendRequest(this.receiveResults, this.receiveError, callbackContainer, jsonData);
    }
}
export default DataTransmitter;