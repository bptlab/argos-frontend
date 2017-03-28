import React from 'react';
import RESTInterface from '../../RemoteHandler/RESTInterface.js'
import ServerMock from '../../RemoteHandler/ServerMock.js'

let instance;
let successCallback, errorCallback, callbackContainer;

beforeAll(() => {
    successCallback = jest.fn();
    errorCallback = jest.fn();
    instance = new RESTInterface();
    callbackContainer = {
        "dataMappingFunction":    jest.fn(),
        "clientSuccessCallback":  jest.fn(),
        "clientErrorCallback":    jest.fn()
    };
    //Seting up a xmlHTTPRequest mock
    instance.client = new ServerMock();
    document.addEventListener("dataReceived", successCallback);
    document.addEventListener("connectionError", errorCallback);
});

test("Test adding a new 200 request", () => {
    instance.addRequest("URI", "GET", callbackContainer);
    expect(successCallback).toHaveBeenCalled();
});

test("Test adding a new 403 request", () => {
    instance.client.status = 403;
    instance.addRequest("URI", "GET", callbackContainer);
    expect(callbackContainer.clientErrorCallback).toHaveBeenCalled();
});

test("Test adding a new 500 request", () => {
    instance.client.status = 500;
    instance.addRequest("URI", "GET", callbackContainer);
    expect(callbackContainer.clientErrorCallback).toHaveBeenCalled();
});

test("Connection error handling", () => {
    instance.client.status = 999;
    const request = {
        "URI":                  "URI",
        "requestMethod":        "GET", //GET or POST
        "callbackContainer":    callbackContainer
    };
    instance.requestQueue.push(request);
    instance.onError(request.callbackContainer);
    expect(errorCallback).toHaveBeenCalled();
});