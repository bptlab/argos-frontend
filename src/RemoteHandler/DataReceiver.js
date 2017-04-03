import DataMapper from './DataMapper.js';
import RemoteHandler from './RemoteHandler.js';

class DataReceiver extends RemoteHandler {

    constructor(remoteAddress, remotePort, notificationCallback) {
        super(remoteAddress, remotePort, notificationCallback);
        this.dataMapper = DataMapper;
        this.requestMethod = 'GET';
        //event binding
        document.addEventListener('dataReceived', this.receiveResults);
        document.addEventListener('connectionError', this.receiveError);
    }

    static getAPIRouteForProductFamilies() {
        return "api/productfamilies";
    }

    static getAPIRouteForProductConfiguration() {
        return "api/productconfigurations/{0}";
    }

    static getAPIRouteForEventTypesOfProduct() {
        return "api/products/{0}/eventtypes";
    }

    static getAPIRouteForEventTypesOfConfiguration() {
        return "api/productconfigurations/{0}/eventtypes";
    }

    static getAPIRouteForEveentsOfProduct() {
        return "api/products/{0}/events/{1}/{2}/{3}";
    }

    static getAPIRouteForAllEventTypes() {
        return "api/eventtypes";
    }


    static getAPIRouteForEveentsOfConfiguration() {
        return "api/productconfigurations/{0}/events/{1}/{2}/{3}";
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

    fetchConfiguration(configurationId, successCallback, errorCallback) {
        const APIRoute = DataReceiver.getAPIRouteForProductConfiguration().format(configurationId);
        const URI = DataReceiver.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapConfigurations,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, this.requestMethod, callbackContainer);
    }

    fetchEventTypesOf(productId, successCallback, errorCallback, forProduct=true) {
        let APIRoute = DataReceiver.getAPIRouteForEventTypesOfProduct().format(productId);
        if(!forProduct) {
            APIRoute = DataReceiver.getAPIRouteForEventTypesOfConfiguration().format(productId);
        }
        const URI = DataReceiver.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapEventTypes,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, this.requestMethod, callbackContainer);
    }

    fetchAllEventTypes(successCallback, errorCallback) {
        const APIRoute = DataReceiver.getAPIRouteForAllEventTypes();
        const URI = DataReceiver.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapEventTypes,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, this.requestMethod, callbackContainer);
    }


    fetchEventsOf(productId, eventTypeId, successCallback, errorCallback, forProduct=true, indexFrom=0, indexTo=9999999) {
        let APIRoute = DataReceiver.getAPIRouteForEveentsOfProduct().format(
            productId, eventTypeId, indexFrom, indexTo);
        if(!forProduct) {
            APIRoute = DataReceiver.getAPIRouteForEveentsOfConfiguration().format(
                productId, eventTypeId, indexFrom, indexTo);
        }
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
