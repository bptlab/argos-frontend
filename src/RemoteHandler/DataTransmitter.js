import RemoteHandler from './RemoteHandler.js';

class DataTransmitter extends RemoteHandler {

    static getAPIRouteForCreateEventtype() {
        return "api/eventtypes/create";
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
        this.client.sendRequest(this.receiveResults, this.receiveError, callbackContainer, JSON.stringify(data));
    }
}
export default DataTransmitter;