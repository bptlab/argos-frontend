import React from 'react';
import DataMapper from './../../ProductFetcher/DataMapper.js';
import TestDataFamilies from './../testData/productFamilies.js'

test("Correct mapping of ProductFamilies", () => {
    const result = TestDataFamilies.PRODUCTFAMILIES;
    expect(DataMapper.mapProductFamilies(result)).toEqual(TestDataFamilies.PRODUCTFAMILIES);
});