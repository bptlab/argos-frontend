import DataMapper from './DataMapper.js';
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
class ProductFetcher {

    static getAPIRouteForProductFamilies() {
        return "api/productfamilies";
    }

    static getAPIRouteForEventTypesOfProduct() {
        return "api/products/{0}/eventtypes";
    }

    static getAPIRouteForEveentsOfProduct() {
        return "api/products/{0}/events/{1}/{2}/{3}";
    }
    
    static getServerRequestURI() {
        return "{0}:{1}/{2}";
    }
    
    constructor(remoteAddress, remotePort, requestMethod = "GET") {
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
    
    parseJSON() {
        try {
            return JSON.parse(this.client.getResponse())
        } catch (error) {
            document.getElementById('root').innerHTML = "ERROR!";
            return [];
        }
    }
    
    receiveProductFamilies() {
        const APIRoute = ProductFetcher.getAPIRouteForProductFamilies();
        const URI = ProductFetcher.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        this.client.open(this.requestMethod, URI, false);
        this.client.sendRequest();
        return this.dataMapper.mapProductFamilies(this.parseJSON());
    }
    
    receiveProducts() {
        const productFamilies = this.receiveProductFamilies();
        const products = [];
        for(let i = 0; i < productFamilies.length; i++) {
            products.push.apply(products,productFamilies[i]["products"]);
        }
        return products;
    }
    
    receiveProduct(prodId) {
        const products = this.receiveProducts();
        return products.find((product) => {
            return product.id === prodId}
        )
    }

    receiveEventTypesOf(productId) {
        const APIRoute = ProductFetcher.getAPIRouteForEventTypesOfProduct().format(productId);
        const URI = ProductFetcher.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        this.client.open(this.requestMethod, URI, false);
        this.client.sendRequest();
        return this.dataMapper.mapEventTypes(this.parseJSON());
    }
    
    receiveEventsOf(productId, eventTypeId, indexFrom=0, indexTo=9999999) {
        const APIRoute = ProductFetcher.getAPIRouteForEveentsOfProduct().format(productId, eventTypeId, indexFrom, indexTo);
        const URI = ProductFetcher.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        this.client.open(this.requestMethod, URI, false);
        this.client.sendRequest();
        return this.dataMapper.mapEvents(this.parseJSON());
    }
}
export default ProductFetcher;