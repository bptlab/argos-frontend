import React from 'react';
import NotificationService from '../../NotificationInterface/NotificationService.js';
import Notification from './../testData/notification.js'

let instance, notificationCallback, notificationListLength;

beforeAll(() => {
    notificationCallback = jest.fn();
    instance = new NotificationService("address", 1234, "/notifications", notificationCallback);
});

test('Check OpenConnection Response', () => {
    instance.onOpenConnection();
    expect(notificationCallback).toHaveBeenCalledTimes(2);
});

test('Check CloseConnection Response', () => {
    instance.onCloseConnection();
    expect(notificationCallback).toHaveBeenCalledTimes(3);
});

test('Check Error Response', () => {
    instance.onError();
    expect(notificationCallback).toHaveBeenCalledTimes(4);
});

test('Subscription', () => {
    instance.subscribe("Event", notificationCallback);
    notificationListLength = instance.notificationSubscribers.length;
    expect(notificationListLength).toBeGreaterThan(0);
});

test('New Message processing', () => {
    let notification = JSON.stringify(Notification.EVENTNOTIFICATION);
    notification = {data: notification};
    instance.processNewMessage(notification);
    expect(notificationCallback).toHaveBeenCalledTimes(5);
});

test('UnSubscription', () => {
    instance.unsubscribe("Event", notificationCallback);
    expect(instance.notificationSubscribers.length).toBeLessThan(notificationListLength);
});