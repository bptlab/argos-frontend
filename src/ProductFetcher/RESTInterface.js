import {argosConfig} from '../config/argosConfig';
import RequestQueue from './RequestQueue.js';
class RESTInterface {
    constructor() {
        this.client = new XMLHttpRequest();
        this.requestQueue = new RequestQueue(this.executeNextRequest.bind(this));
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
        this.sendRequest(request.callbackContainer);
    }

    sendRequest(callbackContainer) {
        this.client.setRequestHeader("content-type", "application/json");
        this.client.onreadystatechange = this.onReadyStateChange.bind(this, callbackContainer);
        this.client.onerror = this.onError.bind(this, callbackContainer);
        this.client.send();
    }

    onReadyStateChange(callbackContainer) {
        if (this.client.readyState === 4) {
            this.requestQueue.pop();
            const resultObject = callbackContainer;
            let event;
            if (this.client.status === 200) {
                resultObject.results = this.client.responseText;
                event = new CustomEvent('dataReceived', { 'detail': resultObject });
            } else {
                resultObject.results = this.client.statusText;
                event = new CustomEvent('connectionError', { 'detail': resultObject });
            }
            document.dispatchEvent(event);
        } 
    }
    
    onError(callbackContainer) {
        this.requestQueue.pop();
        const resultObject = callbackContainer;
        resultObject.results = this.client.statusText;
        const event = new CustomEvent('connectionError', { 'detail': resultObject });
        document.dispatchEvent(event);
    }
}
export default RESTInterface;