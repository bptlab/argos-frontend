import DataMapper from './DataMapper.js';
import RemoteHandler from './RemoteHandler.js';

class DataReceiver extends RemoteHandler {

    constructor(remoteAddress, remotePort) {
        super(remoteAddress, remotePort);
        this.dataMapper = DataMapper;
    }

    static getAPIRouteForProductFamilies() {
        return "api/productfamilies";
    }

    static getAPIRouteForEventTypesOfProduct() {
        return "api/products/{0}/eventtypes";
    }

    static getAPIRouteForEveentsOfProduct() {
        return "api/products/{0}/events/{1}/{2}/{3}";
    }
    
    fetchProductFamilies(successCallback, errorCallback) {
        const APIRoute = DataReceiver.getAPIRouteForProductFamilies();
        const URI = DataReceiver.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        this.client.open('GET', URI, true);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapProductFamilies,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.sendRequest(this.receiveResults, this.receiveError, callbackContainer);
    }
    
    fetchProducts(successCallback, errorCallback) {
        this.fetchProductFamilies(function(productFamilies) {
            const products = [];
            for(let i = 0; i < productFamilies.length; i++) {
                products.push.apply(products,productFamilies[i]["products"]);
            }
            successCallback(products);
        }, errorCallback);
    }
    
    fetchProduct(prodId, successCallback, errorCallback) {
        this.fetchProducts(function(products) {
            successCallback(products.find((product) => {
                return product.id === prodId;}
            ));
        }, errorCallback);
    }

    fetchEventTypesOf(productId, successCallback, errorCallback) {
        const APIRoute = DataReceiver.getAPIRouteForEventTypesOfProduct().format(productId);
        const URI = DataReceiver.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        this.client.open('GET', URI, true);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapEventTypes,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.sendRequest(this.receiveResults, this.receiveError, callbackContainer);
    }
    
    fetchEventsOf(productId, eventTypeId, successCallback, errorCallback, indexFrom=0, indexTo=9999999) {
        const APIRoute = DataReceiver.getAPIRouteForEveentsOfProduct().format(productId, eventTypeId, indexFrom, indexTo);
        const URI = DataReceiver.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        this.client.open('GET', URI, true);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapEvents,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.sendRequest(this.receiveResults, this.receiveError, callbackContainer);
    }
}
export default DataReceiver;