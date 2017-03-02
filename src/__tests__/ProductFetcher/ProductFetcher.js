import React from 'react';
import ProductFetcher from '../../ProductFetcher/ProductFetcher.js';
import RESTInterfaceMock from '../../ProductFetcher/RESTInterfaceMock.js'

let instance;

beforeAll(() => {
    const notificationCallback = jest.fn();
    instance = new ProductFetcher("address", 1234, notificationCallback, "GET");
    instance.setClient(new RESTInterfaceMock);
});

test('Fetch ProductFamilies', () => {
   const successMockCallback = jest.fn();
   const errorMockCallback = jest.fn();
   instance.fetchProductFamilies(successMockCallback, errorMockCallback);
   const expectedData = RESTInterfaceMock.getProductFamily();
   expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Products', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchProducts(successMockCallback, errorMockCallback);
    const expectedData = RESTInterfaceMock.getProductFamily()[0]['products'];
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Product', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchProduct(0, successMockCallback, errorMockCallback);
    const expectedData = RESTInterfaceMock.getProductFamily()[0]['products'][0];
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch EventTypes of specific Product', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchEventTypesOf(0, successMockCallback, errorMockCallback);
    const expectedData = RESTInterfaceMock.getEventTypes();
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Events of specific Product', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchEventsOf(0, 0, successMockCallback, errorMockCallback);
    const expectedData = RESTInterfaceMock.getEvents();
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Error handling', () => {
    const errorMockCallback = jest.fn();
    const callbackContainer = {
        "clientErrorCallback":    errorMockCallback
    };
    instance.receiveError(404, callbackContainer);
    expect(errorMockCallback).toBeCalledWith(404);
});

test('Error handling while parsing JSON', () => {
    const brokenJSON = "[}";
    const errorMockCallback = jest.fn();
    instance.parseJSON(brokenJSON, errorMockCallback)
    expect(errorMockCallback).toBeCalled();
});