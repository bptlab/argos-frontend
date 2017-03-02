import DataMapper from './DataMapper.js';
import RESTInterface from './RESTInterface.js';
import NotificationService from '../NotificationInterface/NotificationService';
import {argosConfig} from '../config/argosConfig';
import RequestQueue from './RequestQueue.js';

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
        this.client = new RESTInterface();
        //function binding
        this.receiveResults = this.receiveResults.bind(this);
        this.receiveError = this.receiveError.bind(this);
        this.requestQueue = new RequestQueue(this.executeNextRequest.bind(this));
    }
    
    setClient(client) {
        this.client = client;
    }
    
    executeNextRequest(queue) {
        const request = queue.head();
        this.client.open(this.requestMethod, request.URI, true);
        this.client.sendRequest(this.receiveResults, this.receiveError, request.callbackContainer);
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
        this.requestQueue.pop();
    }
    
    receiveError(errorCode, clientDataContainer) {
        clientDataContainer.clientErrorCallback(errorCode);
        this.requestQueue.pop();
    }
    
    fetchProductFamilies(successCallback, errorCallback) {
        const APIRoute = ProductFetcher.getAPIRouteForProductFamilies();
        const URI = ProductFetcher.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapProductFamilies,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.addRequest(URI, callbackContainer);
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
        this.addRequest(URI, callbackContainer);
    }
    
    fetchEventsOf(productId, eventTypeId, successCallback, errorCallback, indexFrom=0, indexTo=9999999) {
        const APIRoute = ProductFetcher.getAPIRouteForEveentsOfProduct().format(productId, eventTypeId, indexFrom, indexTo);
        const URI = ProductFetcher.getServerRequestURI().format(this.remoteAddress, this.remotePort, APIRoute);
        const callbackContainer = {
            "dataMappingFunction":    this.dataMapper.mapEvents,
            "clientSuccessCallback":  successCallback,
            "clientErrorCallback":    errorCallback
        };
        this.addRequest(URI, callbackContainer);
    }
    
    addRequest(URI, callbackContainer) {
        const request = {
            "URI":                  URI,
            "callbackContainer":    callbackContainer
        };
        this.requestQueue.push(request);
    }
}
export default ProductFetcher;