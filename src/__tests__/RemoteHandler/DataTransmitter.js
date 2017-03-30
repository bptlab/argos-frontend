import React from 'react';
import DataTransmitter from '../../RemoteHandler/DataTransmitter.js';
import ServerMock from '../../RemoteHandler/ServerMock.js';
import TestData from '../testData/frontend_eventTypes';

let instance;

beforeAll(() => {
    const notificationCallback = jest.fn();
    instance = new DataTransmitter("address", 1234, notificationCallback);
    instance.client.client = new ServerMock();
});

test('Create new event type', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.createEventtype('', {}, [{name: 'test', type: 'STRING'}], successMockCallback, errorMockCallback);
    expect(successMockCallback).toBeCalled();
    instance.createEventtype('', {}, [{name: '', type: ''}], successMockCallback, errorMockCallback);
});

test('Error in data what has to be converted', () => {
    const errorMockCallback = jest.fn();
    // data object is recursive
    const data = {};
    data.a = {b: data};
    DataTransmitter.convertToJson(data, errorMockCallback);
    expect(errorMockCallback).toBeCalled();
});

test('Delete eventType', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    document.addEventListener('dataReceived', successMockCallback);
    instance.deleteEventType(TestData.EVENTTYPES[0], successMockCallback, errorMockCallback);
    expect(successMockCallback).toBeCalled();
});