class RESTInterface {
    constructor() {
        this.client = new XMLHttpRequest();
    }
    
    open(requestMethod, api, async) {
        this.client.open(requestMethod, api, async);
    }

    sendRequest(successCallback, errorCallback, clientDataContainer) {
        this.client.onload = this.onSuccess.bind(this, successCallback, errorCallback, clientDataContainer);
        this.client.onerror = this.onError.bind(this, errorCallback, clientDataContainer);
        this.client.setRequestHeader("Content-type", "application/json");
        this.client.send();
    }
    
    onSuccess(successCallback, errorCallback, clientDataContainer) {
        if (this.client.readyState === 4) {
            if (this.client.status === 200) {
                successCallback(this.client.responseText, clientDataContainer);
            } else {
                errorCallback(this.client.statusText, clientDataContainer);
            }
        } else {
            errorCallback("Wrong route specified", clientDataContainer);
        }
    }
    
    onError(errorCallback, clientDataContainer) {
        errorCallback("A critical connection error occurred! "+this.client.statusText, clientDataContainer);
    }
    
    getResponse() {
        return this.client.responseText;
    }
}
export default RESTInterface;