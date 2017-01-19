const API_PRODUCTFAMILY_ALL = "/api/productFamily/";
const API_PRODUCTFAMILY_SINGLE = "/api/productFamily/{0}/";
const API_PRODUCT_ALL = "/api/productFamily/{0}/";
const API_PRODUCT_SINGLE = "/api/productFamily/{0}/product/{1}";

if (!String.prototype.format) {
    String.prototype.format = function() {
        let args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

class ProductFetcher{
    
    constructor(remoteAddress, remotePort, requestMethod = "POST") {
        this.remoteAddress = remoteAddress;
        this.remotePort = remotePort;
        this.requestMethod = requestMethod;
        this.client = new XMLHttpRequest();
    }
    
    getRemoteAddress() {
        return self.remoteAddress;
    }
    
    getRemotePort() {
        return self.remotePort;
    }

    sendRequest() {
        this.client.setRequestHeader("Content-type", "application/json");
        this.client.send();
    }
    
    receiveSingleProductFamily(familyId) {
        this.client.open(this.requestMethod, String.format(API_PRODUCTFAMILY_SINGLE, familyId), false);
        this.sendRequest();
        return JSON.parse(this.client.responseText)
    }

    receiveAllProductFamilies() {
        this.client.open(this.requestMethod, String.format(API_PRODUCTFAMILY_ALL), false);
        this.sendRequest();
        return JSON.parse(this.client.responseText)
    }

    receiveSingleProduct(familyId, productId) {
        this.client.open(this.requestMethod, String.format(API_PRODUCT_ALL, familyId, productId), false);
        this.sendRequest();
        return JSON.parse(this.client.responseText)
    }

    receiveAllProducts(familyId) {
        this.client.open(this.requestMethod, String.format(API_PRODUCT_SINGLE, familyId), false);
        this.sendRequest();
        return JSON.parse(this.client.responseText)
    }
}
export default ProductFetcher;