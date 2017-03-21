import DataMapper from './DataMapper.js';
import RESTInterface from './RESTInterface.js';
import NotificationService from '../NotificationInterface/NotificationService';
import {argosConfig} from '../config/argosConfig';

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
        return "http://{0}:{1}/{2}";
    }
    
    constructor(remoteDomain, remotePort, notificationCallback, requestMethod = "GET") {
        this.remoteAddress = remoteDomain;
        this.notificationCallback = notificationCallback;
        this.remotePort = remotePort;
        this.requestMethod = requestMethod;
        this.dataMapper = DataMapper;
        this.notificationService = new NotificationService(
            remoteDomain, 
            remotePort,
            argosConfig.backendNotificationAPI, 
            notificationCallback
        );
        //function binding
        this.receiveResults = this.receiveResults.bind(this);
        this.receiveError = this.receiveError.bind(this);
        //client has to be initialized at last due to the required this context of its callback methods
        this.client = new RESTInterface(this.receiveError, this.receiveResults);
    }
    
    setClient(client) {
        this.client = client;
    }

    parseJSON(results, errorCallback) {
        try {
            return JSON.parse(results);
        } catch (error) {
            errorCallback(error);
            return [];
        }
    }
    
    receiveResults(results, clientDataContainer) {
        const errorCallback = clientDataContainer.clientErrorCallback;
        const data = clientDataContainer.dataMappingFunction(this.parseJSON(results), errorCallback);
        clientDataContainer.clientSuccessCallback(data);
    }
    
    receiveError(errorCode, clientDataContainer) {
        clientDataContainer.clientErrorCallback(errorCode);
    }
    
    fetchProductFamilies(successCallback, errorCallback) {
        const APIRoute = ProductFetcher.getAPIRouteForProductFamilies();
        const URI = ProductFetcher.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
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
        const APIRoute = ProductFetcher.getAPIRouteForEventTypesOfProduct().format(productId);
        const URI = ProductFetcher.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapEventTypes,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, this.requestMethod, callbackContainer);
    }
    
    fetchEventsOf(productId, eventTypeId, successCallback, errorCallback, indexFrom=0, indexTo=9999999) {
        const APIRoute = ProductFetcher.getAPIRouteForEveentsOfProduct().format(productId, eventTypeId, indexFrom, indexTo);
        const URI = ProductFetcher.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapEvents,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.client.addRequest(URI, this.requestMethod, callbackContainer);
    }
}
export default ProductFetcher;