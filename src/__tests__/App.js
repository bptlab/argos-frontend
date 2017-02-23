import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App/App.js';

test('renders without crashing', () => {
  const notificationCallback = jest.fn();
  //Complex parameter necessary due to React-Router nesting
  const props = {
      params: {
          registerForNotificationsCallback: notificationCallback
      }
  };
  const div = document.createElement('div');
  ReactDOM.render(<App route={props} />, div);
});
