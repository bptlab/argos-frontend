import React from 'react';
import RESTInterface from '../../ProductFetcher/RESTInterface.js'

let instance;
let openMockCallback, sendMockCallback, setRequestHeaderMock;

beforeAll(() => {
    openMockCallback = jest.fn();
    sendMockCallback = jest.fn();
    setRequestHeaderMock = jest.fn();
    instance = new RESTInterface();
    //Seting up a xmlHTTPRequest mock
    instance.client = {
        open: openMockCallback,
        send: sendMockCallback,
        setRequestHeader: setRequestHeaderMock,
        readyState: 4,
        status: 200
    };
});

test("Testing Opening a new REST connection", () => {
    instance.open("GET", "localhost", 1234);
    expect(openMockCallback).toBeCalledWith("GET", "localhost", 1234);
});

test("Sending a request", () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.sendRequest(successMockCallback, errorMockCallback, {});
    expect(sendMockCallback).toBeCalled();
    expect(setRequestHeaderMock).toBeCalled();
});

test("Success handling", () => {
    const successMockCallback = jest.fn();
    const errorMockCallback = jest.fn();
    instance.onSuccess(successMockCallback, errorMockCallback, {});
    expect(successMockCallback).toHaveBeenCalledTimes(1);
    
    instance.client.status = 0;
    instance.onSuccess(successMockCallback, errorMockCallback, {});
    expect(errorMockCallback).toHaveBeenCalledTimes(1);

    instance.client.readyState = 0;
    instance.onSuccess(successMockCallback, errorMockCallback, {});
    expect(errorMockCallback).toHaveBeenCalledTimes(2);
});

test("Error handling", () => {
    const errorMockCallback = jest.fn();
    instance.onError(errorMockCallback, {});
    expect(errorMockCallback).toHaveBeenCalledTimes(1);
});