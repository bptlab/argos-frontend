import DataMapper from './DataMapper';
import RESTInterface from './RESTInterface';

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

    static getAPIRouteForAllProductFamilies() {
        return "/api/productfamilies/";
    }

    static getAPIRouteForEventTypesOfProduct() {
        return "/api/products/{0}/eventtypes";
    }

    static getAPIRouteForEveentsOfProduct() {
        return "/api/products/{0}/events/{1}/{2}/{3}/";
    }
    
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
        const APIRoute = this.getAPIRouteForAllProductFamilies();
        this.client.open(this.requestMethod, APIRoute, false);
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
        const APIRoute = this.getAPIRouteForEventTypesOfProduct().format(productId);
        this.client.open(this.requestMethod, APIRoute, false);
        this.client.sendRequest();
        return this.mapEventTypes(JSON.parse(this.client.getResponse()));
    }
    
    receiveAllEventsOf(productId, eventTypeId, indexFrom, indexTo) {
        const APIRoute = this.getAPIRouteForEveentsOfProduct().format(productId, eventTypeId, indexFrom, indexTo);
        this.client.open(this.requestMethod, APIRoute, false);
        this.client.sendRequest();
        return this.dataMapper.mapEvents(this.parse(this.client.getResponse()));
    }
}
export default ProductFetcher;