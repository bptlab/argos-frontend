import React from 'react';
import ProductFetcher from '../../RemoteHandler/DataReceiver.js';
import ServerMock from '../../RemoteHandler/ServerMock.js'
import frontend_ProductFamilies from '../testData/frontend_productFamilies.js'
import frontend_configurations from '../testData/frontend_configurations.js'
import frontend_eventTypes from '../testData/frontend_eventTypes.js'
import frontend_events from '../testData/frontend_events.js'

let instance;

beforeAll(() => {
    const notificationCallback = jest.fn();
    instance = new ProductFetcher("address", 1234, notificationCallback);
    instance.client.client = new ServerMock();
});

test('Fetch ProductFamilies', () => {
   const successMockCallback = jest.fn();
   const errorMockCallback = jest.fn();
   instance.fetchProductFamilies(successMockCallback, errorMockCallback);
   const expectedData = frontend_ProductFamilies.PRODUCTFAMILIES;
   expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Products', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchProducts(successMockCallback, errorMockCallback);
    let expectedData = [];
    frontend_ProductFamilies.PRODUCTFAMILIES.forEach((productFamily => {
        expectedData = expectedData.concat(productFamily.products);
    }));
    expectedData = expectedData.concat();
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Product', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchProduct(0, successMockCallback, errorMockCallback);
    const expectedData = frontend_ProductFamilies.PRODUCTFAMILIES[0].products[0];
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch EventTypes of specific Product', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchEventTypesOf(0, successMockCallback, errorMockCallback);
    const expectedData = frontend_eventTypes.EVENTTYPES;
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch all EventTypes', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchAllEventTypes(successMockCallback, errorMockCallback);
    const expectedData = frontend_eventTypes.EVENTTYPES;
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Events of specific Product', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchEventsOf(0, 0, successMockCallback, errorMockCallback);
    const expectedData = frontend_events.EVENTS;
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Fetch Configuration', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.fetchConfiguration(100, successMockCallback, errorMockCallback);
    const expectedData = frontend_configurations.CONFIGURATIONS[0];
    expect(successMockCallback).toBeCalledWith(expectedData);
});

test('Error handling', () => {
    const errorMockCallback = jest.fn();
    const callbackContainer = {
        "clientErrorCallback":    errorMockCallback,
        "statusCode":   404,
        "results":  "An error occured"
    };
    instance.receiveError({detail: callbackContainer});
    expect(errorMockCallback).toBeCalledWith(callbackContainer.results, callbackContainer.statusCode);
});

test('Error handling while parsing JSON', () => {
    const brokenJSON = "[}";
    const errorMockCallback = jest.fn();
    instance.parseJSON(brokenJSON, errorMockCallback);
    expect(errorMockCallback).toBeCalled();
});
