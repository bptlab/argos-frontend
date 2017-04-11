import React from 'react';
import DetailArea from '../../ProductView/DetailArea/DetailArea.js';
import react from 'react-dom';
import testProduct from '../testData/product.js';
import testConfigurations from '../testData/frontend_configurations.js';
let instance;
const node = document.createElement('div');

test('Render DetailArea', () => {
    react.render(
        <DetailArea ref={(child) => {instance = child}}
            product={testProduct.PRODUCT}
            configuration={testConfigurations.CONFIGURATIONS[0]}
            showAllConfigurations={true}/>, 
        node);
    expect(instance.state.configuration).toEqual(testProduct.PRODUCT);
});


test('Show configuration-details', () => {
    react.render(
        <DetailArea ref={(child) => {instance = child}}
            product={testProduct.PRODUCT}
            configuration={testConfigurations.CONFIGURATIONS[0]}
            showAllConfigurations={false}/>, 
        node);
    expect(instance.state.configuration).toEqual(testConfigurations.CONFIGURATIONS[0]);
})
