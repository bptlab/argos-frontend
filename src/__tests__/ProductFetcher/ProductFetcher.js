import React from 'react';
import ProductFetcher from '../../ProductFetcher/ProductFetcher.js';
import ServerMock from '../../ProductFetcher/ServerMock.js'

let instance;

beforeAll(() => {
    const notificationCallback = jest.fn();
    instance = new ProductFetcher("address", 1234, notificationCallback, "GET");
    instance.client.client = new ServerMock();
});

test('Fetch ProductFamilies', () => {
   const successMockCallback = jest.fn();
   const errorMockCallback = jest.fn();
   instance.fetchProductFamilies(successMockCallback, errorMockCallback);
   const expectedData = ServerMock.getProductFamily();
   expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Products', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchProducts(successMockCallback, errorMockCallback);
    const expectedData = ServerMock.getProductFamily()[0]['products'];
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Product', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchProduct(0, successMockCallback, errorMockCallback);
    const expectedData = ServerMock.getProductFamily()[0]['products'][0];
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch EventTypes of specific Product', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchEventTypesOf(0, successMockCallback, errorMockCallback);
    const expectedData = ServerMock.getEventTypes();
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Events of specific Product', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchEventsOf(0, 0, successMockCallback, errorMockCallback);
    const expectedData = ServerMock.getEvents();
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Error handling', () => {
    const errorMockCallback = jest.fn();
    const callbackContainer = {
        "clientErrorCallback":    errorMockCallback,
        "results":  404
    };
    instance.receiveError({detail: callbackContainer});
    expect(errorMockCallback).toBeCalledWith(404);
});

test('Error handling while parsing JSON', () => {
    const brokenJSON = "[}";
    const errorMockCallback = jest.fn();
    instance.parseJSON(brokenJSON, errorMockCallback);
    expect(errorMockCallback).toBeCalled();
});