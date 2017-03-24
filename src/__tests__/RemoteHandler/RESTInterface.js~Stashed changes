import React from 'react';
import RESTInterface from '../../RemoteHandler/RESTInterface.js'
import ServerMock from '../../RemoteHandler/ServerMock.js'

let instance;
let successCallback, errorCallback;

beforeAll(() => {
    successCallback = jest.fn();
    errorCallback = jest.fn();
    instance = new RESTInterface();
    //Seting up a xmlHTTPRequest mock
    instance.client = new ServerMock();
    document.addEventListener("dataReceived", successCallback);
    document.addEventListener("connectionError", errorCallback);
});

test("Test adding a new request", () => {
    instance.addRequest("URI", "GET", {});
    expect(successCallback).toBeCalled();
});

test("Test wrong status code", () => {
    instance.client.status = 400;
    instance.addRequest("URI", "GET", {});
    expect(errorCallback).toBeCalled();
});

test("Connection error handling", () => {
    const request = {
        "URI":                  "URI",
        "requestMethod":        "GET", //GET or POST
        "callbackContainer":    {}
    };
    instance.requestQueue.push(request);
    instance.onError(request.callbackContainer);
    expect(errorCallback).toBeCalled();
});