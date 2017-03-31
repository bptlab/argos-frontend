import React from 'react';
import ConfigurationHeader from '../../ProductView/Header/ConfigurationHeader/ConfigurationHeader.js';
import renderer from 'react-test-renderer';
import TestProduct from './../testData/product.js'

let instance, component;

const firstTestConfiguration = TestProduct.PRODUCT.configurations[0];
const secondTestConfiguration = TestProduct.PRODUCT.configurations[1];
const onChangeProductConfiguration = jest.fn();

test("Rendering of ConfigurationHeader", () => {
    component = renderer.create(
        <ConfigurationHeader
            ref={(child) => {instance = child}}
            configurations={TestProduct.PRODUCT.configurations}
            onChangeProductConfiguration={onChangeProductConfiguration}/>
    );

    expect(instance.state.selectedCodingPlug).toEqual(firstTestConfiguration.codingPlugId.toString());
    expect(instance.state.selectedSoftwareVersion).toEqual(firstTestConfiguration.codingPlugSoftwareVersions[0].toString());

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Changing configuration selection", () => {
    let event = {target: {value: secondTestConfiguration.codingPlugId.toString()}};
    instance.handleChangeSelectedCodingPlug(event);
    expect(instance.state.selectedCodingPlug).toEqual(secondTestConfiguration.codingPlugId.toString());
    expect(instance.state.selectedSoftwareVersion).toEqual(secondTestConfiguration.codingPlugSoftwareVersions[0].toString());
    expect(onChangeProductConfiguration).toBeCalled();

    event = {target: {value: secondTestConfiguration.codingPlugSoftwareVersions[1].toString()}};
    instance.handleChangeSelectedSoftwareVersion(event);
    expect(instance.state.selectedCodingPlug).toEqual(secondTestConfiguration.codingPlugId.toString());
    expect(instance.state.selectedSoftwareVersion).toEqual(secondTestConfiguration.codingPlugSoftwareVersions[1].toString());
    expect(onChangeProductConfiguration).toBeCalled();
});

test("Toggle between all and configuration selection", () => {
    let event = {target: {checked: true}};
    instance.toggleShowAll(event);
    expect(instance.state.showAll).toBeTruthy();
    expect(onChangeProductConfiguration).toBeCalledWith(null);

    event = {target: {checked: false}};
    instance.toggleShowAll(event);
    expect(instance.state.showAll).toBeFalsy();
    expect(onChangeProductConfiguration).toBeCalled();
});
