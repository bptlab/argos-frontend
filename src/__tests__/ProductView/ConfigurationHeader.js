import React from 'react';
import ConfigurationHeader from '../../ProductView/Header/ConfigurationHeader/ConfigurationHeader.js';
import renderer from 'react-test-renderer';
import TestProduct from './../testData/product.js'

let instance, component;

const firstTestConfiguration = TestProduct.PRODUCT.configurations[0];
const secondTestConfiguration = TestProduct.PRODUCT.configurations[1];
const setProductConfiguration = jest.fn();

test("Rendering of ConfigurationHeader", () => {
    component = renderer.create(
        <ConfigurationHeader
            ref={(child) => {instance = child}}
            configurations={TestProduct.PRODUCT.configurations}
            setProductConfiguration={setProductConfiguration}/>
    );

    expect(instance.state.selectedCodingPlug).toEqual(firstTestConfiguration.codingPlugId.toString());
    expect(instance.state.selectedSoftwareVersion).toEqual(firstTestConfiguration.codingPlugSoftwareVersions[0].toString());
    expect(setProductConfiguration).toBeCalled();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Changing configuration selection", () => {
    let event = {target: {value: secondTestConfiguration.codingPlugId.toString()}};
    instance.selectedCodingPlugChanged(event);
    expect(instance.state.selectedCodingPlug).toEqual(secondTestConfiguration.codingPlugId.toString());
    expect(instance.state.selectedSoftwareVersion).toEqual(secondTestConfiguration.codingPlugSoftwareVersions[0].toString());
    expect(setProductConfiguration).toBeCalled();

    event = {target: {value: secondTestConfiguration.codingPlugSoftwareVersions[1].toString()}};
    instance.selectedSoftwareVersionChanged(event);
    expect(instance.state.selectedCodingPlug).toEqual(secondTestConfiguration.codingPlugId.toString());
    expect(instance.state.selectedSoftwareVersion).toEqual(secondTestConfiguration.codingPlugSoftwareVersions[1].toString());
    expect(setProductConfiguration).toBeCalled();
});
