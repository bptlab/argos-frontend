import React from 'react';
import Diagram from '../../DashboardView/Diagram/Diagram.js';
import renderer from 'react-test-renderer';
import TestData from '../testData/products.js'
let instance;

test("Correct drawing of Diagram", () => {
    const component = renderer.create(
        <Diagram 
            ref={(child) => {instance = child}}
            products={TestData.PRODUCTS}
            onStateExcludeInput={() => {/* do nothing in case of test */}}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Correct extraction of data for displaying", () => {
    const simpleProducts = [{
        state: "WARNING"
    },{
        state: "WARNING"
    }];
    instance.chartData = [];
    instance.chartLabels = [];
    instance.fetchChartData(simpleProducts);
    expect(instance.chartLabels.length).toEqual(1);
    expect(instance.chartData.length).toEqual(1);
    expect(instance.chartLabels[0]).toEqual("WARNING");
    expect(instance.chartData[0]).toEqual(2);
});