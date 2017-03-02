import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App.js';
import renderer from 'react-test-renderer';

let instance;
test('renders without crashing', () => {
  const notificationCallback = jest.fn();
  //Complex parameter necessary due to React-Router nesting
  const props = {
      params: {
          registerForNotificationsCallback: notificationCallback
      }
  };
  const component = renderer.create(
      <App ref={(child) => {instance = child}}
           route={props} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  instance.notificationHandler({
      type: "danger",
      message: "Test-Notification"
  });
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
