import DataMapper from './DataMapper.js';
import RemoteHandler from './RemoteHandler.js';

class DataReceiver extends RemoteHandler {

    constructor(remoteAddress, remotePort, notificationCallback) {
        super(remoteAddress, remotePort, notificationCallback);
        this.dataMapper = DataMapper;
        this.requestMethod = 'GET';
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
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapProductFamilies,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, this.requestMethod, callbackContainer);
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
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapEventTypes,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, this.requestMethod, callbackContainer);
    }
    
    fetchEventsOf(productId, eventTypeId, successCallback, errorCallback, indexFrom=0, indexTo=9999999) {
        const APIRoute = DataReceiver.getAPIRouteForEveentsOfProduct().format(productId, eventTypeId, indexFrom, indexTo);
        const URI = DataReceiver.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapEvents,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, this.requestMethod, callbackContainer);
    }
}
export default DataReceiver;