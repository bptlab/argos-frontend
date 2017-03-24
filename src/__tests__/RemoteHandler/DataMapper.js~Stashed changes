import React from 'react';
import DataMapper from './../../RemoteHandler/DataMapper.js';
import frontend_ProductFamilies from '../testData/frontend_productFamilies.js'
import TestDataEventTypes from '../testData/frontend_eventTypes.js'
import TestDataEvents from '../testData/frontend_events.js'
import ServerMock from './../../RemoteHandler/ServerMock'

test("Correct mapping of ProductFamilies", () => {
    const rawServerData = ServerMock.getProductFamily();
    expect(DataMapper.mapProductFamilies(rawServerData)).toEqual(frontend_ProductFamilies.PRODUCTFAMILIES);
});

test("Correct mapping of EventyTypes", () => {
    const result = TestDataEventTypes.EVENTTYPES;
    expect(DataMapper.mapEventTypes(result)).toEqual(TestDataEventTypes.EVENTTYPES);
});

test("Correct mapping of Events", () => {
   const result = TestDataEvents.EVENTS;
    expect(DataMapper.mapEvents(result)).toEqual(TestDataEvents.EVENTS);
});