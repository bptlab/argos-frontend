import RequestQueue from './RequestQueue.js';

class RESTInterface {
    constructor() {
        this.client = new XMLHttpRequest();
        this.requestQueue = new RequestQueue(this.executeNextRequest.bind(this));
    }

    addRequest(URI, requestMethod, callbackContainer, data = null) {
        const request = {
            "URI":                  URI,
            "requestMethod":        requestMethod, //GET or POST
            "callbackContainer":    callbackContainer,
            "data":                 data //In case of POST
        };
        this.requestQueue.push(request);
    }

    executeNextRequest(queue) {
        const request = queue.head();
        this.client.open(request.requestMethod, request.URI, true);
        this.sendRequest(request.callbackContainer, request.data);
    }

    sendRequest(callbackContainer, data) {
        this.client.setRequestHeader("content-type", "application/json");
        const dataSended = !!data;
        this.client.onreadystatechange = this.onReadyStateChange.bind(this, callbackContainer, dataSended);
        this.client.onerror = this.onError.bind(this, callbackContainer);
        this.client.send(data);
    }

    onReadyStateChange(callbackContainer, dataSended) {
        if (this.client.readyState === 4) {
            this.requestQueue.pop();
            const resultObject = callbackContainer;
            let event;
            if (this.client.status === 200) {
                resultObject.results = this.client.responseText;
                if(dataSended) {
                    event = new CustomEvent('dataSended', { 'detail': resultObject });
                } else {
                    event = new CustomEvent('dataReceived', { 'detail': resultObject });
                }
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