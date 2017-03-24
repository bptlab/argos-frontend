import React from 'react';
import DataTransmitter from '../../RemoteHandler/DataTransmitter.js';
import ServerMock from '../../RemoteHandler/ServerMock.js';

let instance;

beforeAll(() => {
    const notificationCallback = jest.fn();
    instance = new DataTransmitter("address", 1234, notificationCallback);
    instance.client.client = new ServerMock();
});

test('Create new event type', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.createEventtype('', {}, successMockCallback, errorMockCallback);
    expect(successMockCallback).toBeCalled();
});

test('Error in data what has to be converted', () => {
    const errorMockCallback = jest.fn();
    // data object is recursive
    const data = {};
    data.a = {b: data};
    DataTransmitter.convertToJson(data, errorMockCallback);
    expect(errorMockCallback).toBeCalled();
});