import React from 'react';
import EventTable from '../../ProductView/EventTable/EventTable.js';
import renderer from 'react-test-renderer';
import TestEvents from '../testData/frontend_events.js';
import TestEventTypes from '../testData/frontend_eventTypes';
let instance;

test("Rendering of EventTable", () => {
    const mockFilter = {id: 'mock-filter', value: '4', column: 'errorcode'};
    const component = renderer.create(
        <EventTable ref={(child) => {instance = child}}
                    header={TestEventTypes.EVENTTYPES[0].attributes}
                    events={TestEvents.EVENTS}
                    filter={[mockFilter]}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Inclusion of two values", () => {
  expect(instance.doesContain("baseString", "string")).toBeTruthy();
  expect(instance.doesContain([123], "12")).toBeTruthy();
  expect(instance.doesContain("baseString", "strr")).toBeFalsy();
});
