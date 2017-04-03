import React from 'react';
import Settings from './../../DashboardView/Settings/Settings.js';
import renderer from 'react-test-renderer';
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
        notificationService: notificationService
    };
    component = renderer.create(
        <Settings
            dataSource={dataSource}
            ref={(child) => {instance = child}}
            dataSender={dataSender} />
    );
});

test('Correct rendering of Settings', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Correct rendering of Settings after modal has been opened', () => {
    instance.modalShow();
    expect(dataSource.fetchAllEventTypes).toHaveBeenCalled();
    expect(dataSource.notificationService.subscribe).toHaveBeenCalled();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Correct rendering of Settings after modal has been closed', () => {
    instance.modalShow();
    instance.onSubmit();
    expect(dataSource.notificationService.unsubscribe).toHaveBeenCalled();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

