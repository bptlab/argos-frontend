import React from 'react';
import PredictionList from '../../ProductView/PredictionList/PredictionList.js';
import renderer from 'react-test-renderer';
import testConfigurations from '../testData/frontend_configurations.js';


test('Render DetailArea', () => {
    const component = renderer.create(
        <PredictionList
            configuration={testConfigurations.CONFIGURATIONS[0]} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});