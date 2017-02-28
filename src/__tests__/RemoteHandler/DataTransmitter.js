import React from 'react';
import DataTransmitter from '../../RemoteHandler/DataTransmitter.js';
import RESTInterfaceMock from '../../RemoteHandler/RESTInterfaceMock.js';

let instance;

beforeAll(() => {
    instance = new DataTransmitter("address", 1234);
    instance.setClient(new RESTInterfaceMock)
});

test('Create new event type', () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.createEventtype('', {}, successMockCallback, errorMockCallback);
    expect(successMockCallback).toBeCalled();
});