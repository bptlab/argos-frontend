import {argosConfig} from '../config/argosConfig';
import RequestQueue from './RequestQueue.js';
class RESTInterface {
    constructor(errorCallback, successCallback) {
        this.client = new XMLHttpRequest();
        this.requestQueue = new RequestQueue(this.executeNextRequest.bind(this));
        this.errorCallback = errorCallback;
        this.successCallback = successCallback;
    }
    
    addRequest(URI, requestMethod, callbackContainer) {
        const request = {
            "URI":                  URI,
            "requestMethod":        requestMethod, //GET or POST
            "callbackContainer":    callbackContainer
        };
        this.requestQueue.push(request);
    }

    executeNextRequest(queue) {
        const request = queue.head();
        this.client.open(request.requestMethod, request.URI, true);
        this.sendRequest(this.successCallback, this.errorCallback, request.callbackContainer);
    }

    sendRequest(successCallback, errorCallback, clientDataContainer) {
        this.client.setRequestHeader("content-type", "application/json");
        this.client.onreadystatechange = this.onSuccess.bind(this, successCallback, errorCallback, clientDataContainer);
        this.client.onerror = this.onError.bind(this, errorCallback, clientDataContainer);
        this.client.send();
    }
    
    onSuccess(successCallback, errorCallback, clientDataContainer) {
        if (this.client.readyState === 4) {
            this.requestQueue.pop();
            const responseText = this.client.responseText;
            const statusText = this.client.statusText;
            if (this.client.status === 200) {
                successCallback(responseText, clientDataContainer);
            } else {
                errorCallback(statusText, clientDataContainer);
            }
        } 
    }
    
    onError(errorCallback, clientDataContainer) {
        this.requestQueue.pop();
        errorCallback(argosConfig.RESTInterfaceConnectionError+" "+this.client.statusText, clientDataContainer);
    }
}
export default RESTInterface;