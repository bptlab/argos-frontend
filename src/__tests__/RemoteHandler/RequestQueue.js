import React from 'react';
import RequestQueue from '../../RemoteHandler/RequestQueue.js'

let instance, headChangedCallback;

beforeAll(() => {
    headChangedCallback = jest.fn();
    instance =  new RequestQueue(headChangedCallback)
});

test("Test pushing", () => {
    instance.push("workItem");
    expect(instance.queue.length).toBeGreaterThan(0);
    expect(headChangedCallback).toBeCalled();
});

test("Test poping", () => {
    instance.pop();
    expect(instance.queue.length).toEqual(0);
    instance.push("workItem1");
    instance.push("workItem2");
    instance.pop();
    expect(headChangedCallback).toHaveBeenCalledTimes(3);
    instance.pop();
});

test("Test receiving head", () => {
    let result = instance.head();
    expect(result).toBeNull();
    instance.push("workItem");
    result = instance.head();
    expect(result).toEqual("workItem");
});