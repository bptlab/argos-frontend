import RESTInterface from './RESTInterface.js';
/*eslint-disable */
if (!String.prototype.format) {
    String.prototype.format = function() {
        const args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}
/*eslint-enable */
class RemoteHandler {

    constructor(remoteAddress, remotePort) {
        this.remoteAddress = remoteAddress;
        this.remotePort = remotePort;
        this.client = new RESTInterface();
        //function binding
        this.receiveResults = this.receiveResults.bind(this);
        this.receiveError = this.receiveError.bind(this);
    }

    static getServerRequestURI() {
        return "{0}:{1}/{2}";
    }

    setClient(client) {
        this.client = client;
    }

    parseJSON(results, errorCallback) {
        try {
            return JSON.parse(results);
        } catch (error) {
            errorCallback(error);
            return [];
        }
    }

    receiveResults(results, clientDataContainer) {
        const errorCallback =   clientDataContainer.clientErrorCallback;
        const data = clientDataContainer.dataMappingFunction(this.parseJSON(results), errorCallback);
        clientDataContainer.clientSuccessCallback(data);
    }

    receiveError(errorCode, clientDataContainer) {
        clientDataContainer.clientErrorCallback(errorCode);
    }
}
export default RemoteHandler;