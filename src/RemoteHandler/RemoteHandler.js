import RESTInterface from './RESTInterface.js';
import NotificationService from '../NotificationInterface/NotificationService';
import {argosConfig} from '../config/argosConfig';

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

    static getServerRequestURI() {
        return "http://{0}:{1}/{2}";
    }
    
    constructor(remoteDomain, remotePort, notificationCallback) {
        this.remoteAddress = remoteDomain;
        this.notificationCallback = notificationCallback;
        this.remotePort = remotePort;
        this.notificationService = new NotificationService(
            remoteDomain,
            remotePort,
            argosConfig.backendNotificationAPI,
            notificationCallback
        );
        this.client = new RESTInterface();
        //function binding
        this.receiveResults = this.receiveResults.bind(this);
        this.receiveError = this.receiveError.bind(this);
    }

    parseJSON(results, errorCallback) {
        try {
            return JSON.parse(results);
        } catch (error) {
            errorCallback(error);
            return [];
        }
    }

    receiveResults(event) {
        const errorCallback = event.detail.clientErrorCallback;
        const parsedResults = this.parseJSON(event.detail.results, errorCallback);
        const data = event.detail.dataMappingFunction(parsedResults, errorCallback);
        event.detail.clientSuccessCallback(data);
    }

    receiveError(event) {
        event.detail.clientErrorCallback(event.detail.results, event.detail.statusCode);
    }
}
export default RemoteHandler;