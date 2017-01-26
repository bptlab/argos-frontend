class RESTInterface {
    constructor() {
        this.client = new XMLHttpRequest();
    }
    
    open(requestMethod, api, async) {
        this.client.open(requestMethod, api, async);
    }

    sendRequest() {
        this.client.setRequestHeader("Content-type", "application/json");
        this.client.send();
    }
    
    getResponse() {
        return this.client.responseText;
    }
}
export default RESTInterface;