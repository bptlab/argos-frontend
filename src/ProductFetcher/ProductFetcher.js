import DataMapper from './DataMapper';
import RESTInterface from './RESTInterface';

export const API_PRODUCTFAMILY_ALL = "/api/productfamilies/";
export const API_EVENTYPES_OF_PRODUCT = "/api/products/{0}/eventtypes";
export const API_EVENTS_OF_PRODUCTS = "/api/products/{0}/events/{1}/{2}/{3}/";

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

class ProductFetcher {
    
    constructor(remoteAddress, remotePort, requestMethod = "POST") {
        this.remoteAddress = remoteAddress;
        this.remotePort = remotePort;
        this.requestMethod = requestMethod;
        this.dataMapper = DataMapper;
        this.client = new RESTInterface();
    }

    getRemoteAddress() {
        return self.remoteAddress;
    }
    
    getRemotePort() {
        return self.remotePort;
    }
    
    setClient(client) {
        this.client = client;
    }
    
    receiveProductFamilies() {
        this.client.open(this.requestMethod, API_PRODUCTFAMILY_ALL, false);
        this.client.sendRequest();
        return this.dataMapper.mapProductFamilies(JSON.parse(this.client.getResponse()));
    }
    
    receiveAllProducts() {
        const productFamilies = this.receiveProductFamilies();
        const allProducts = [];
        for(let i = 0; i < productFamilies.length; i++) {
           allProducts.push.apply(allProducts,productFamilies[i]["products"]);
        }
        return allProducts;
    }

    receiveAllEventTypesOf(productId) {
        this.client.open(this.requestMethod, API_EVENTYPES_OF_PRODUCT.format(productId), false);
        this.client.sendRequest();
        return this.mapEventTypes(JSON.parse(this.client.getResponse()));
    }
    
    receiveAllEventsOf(productId, eventTypeId, indexFrom, indexTo) {
        const APIRoute = API_EVENTS_OF_PRODUCTS.format(productId, eventTypeId, indexFrom, indexTo);
        this.client.open(this.requestMethod, APIRoute, false);
        this.client.sendRequest();
        return this.dataMapper.mapEvents(this.parse(this.client.getResponse()));
    }
}
export default ProductFetcher;