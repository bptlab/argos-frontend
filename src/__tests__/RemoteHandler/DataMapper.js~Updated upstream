import React from 'react';
import DataMapper from './../../RemoteHandler/DataMapper.js';
import TestDataFamilies from './../testData/productFamilies.js'
import TestDataEventTypes from './../testData/eventTypes.js'
import TestDataEvents from './../testData/events.js'

test("Correct mapping of ProductFamilies", () => {
    const result = TestDataFamilies.PRODUCTFAMILIES;
    expect(DataMapper.mapProductFamilies(result)).toEqual(TestDataFamilies.PRODUCTFAMILIES);
});

test("Correct mapping of EventyTypes", () => {
    const result = TestDataEventTypes.EVENTTYPES;
    expect(DataMapper.mapEventTypes(result)).toEqual(TestDataEventTypes.EVENTTYPES);
});

test("Correct mapping of Events", () => {
   const result = TestDataEvents.EVENTS;
    expect(DataMapper.mapEvents(result)).toEqual(TestDataEvents.EVENTS);
});