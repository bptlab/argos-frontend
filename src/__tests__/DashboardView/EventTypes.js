import React from 'react';
import ReactDOM from 'react-dom';
import EventTypes from './../../DashboardView/Settings/EventTypes/EventTypes.js';
import renderer from 'react-test-renderer';
import TestData from '../testData/frontend_eventTypes.js';
let instance, dataSource, dataSender, component;
import 'bootstrap';

beforeEach(() => {
    const notificationService = {
        subscribe: jest.fn(),
        unsubscribe: jest.fn()
    };
    dataSource = {
        fetchAllEventTypes: jest.fn(),
        notificationService: notificationService
    };
    dataSender = {
        notificationService: notificationService,
        deleteEventType: jest.fn(),
    };
    component = renderer.create(
        <EventTypes
            dataSource={dataSource}
            dataSender={dataSender}
            settingsVisible={false}
            ref={(child) => {instance = child}} />
    );
});

test('Correct rendering of EventTypes-Settings', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Receive eventTypes', () => {
    instance.receiveEventTypes(TestData.EVENTTYPES);
    expect(instance.state.eventTypes).toEqual(TestData.EVENTTYPES);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Correct rendering of EventTypes-Settings while beeing visible', () => {
    const node = document.createElement('div');
    //two times rendering using ReactDOM invokes updating of component
    ReactDOM.render( <EventTypes
        dataSource={dataSource}
        dataSender={dataSender}
        settingsVisible={false}
        ref={(child) => {instance = child}} />, node);
    ReactDOM.render( <EventTypes
        dataSource={dataSource}
        dataSender={dataSender}
        settingsVisible={true}
        ref={(child) => {instance = child}} />, node);
    expect(dataSource.fetchAllEventTypes).toHaveBeenCalled();
});

test('Receiving 403 error', () => {
    instance.receiveError("You are not allowed to touch this eventType", 403);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Receiving 500 error', () => {
    instance.receiveError("There still exist dependencies concerning this eventType", 500);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Receiving undefined error', () => {
    instance.receiveError("Error", 999);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Delete eventTypes', () => {
    instance.delteEventType(TestData.EVENTTYPES);
    expect(dataSender.deleteEventType).toHaveBeenCalled();
});

test('Successfuly remmoved eventType', () => {
    instance.deletionSuccessful();
    expect(dataSource.fetchAllEventTypes).toHaveBeenCalled();
});