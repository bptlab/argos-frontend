import React, {Component} from 'react';
import LoadingAnimation from './../Utils/LoadingAnimation';
import ErrorMessage from './../Utils/ErrorMessage';
import config from './../config/config.js';
import BackendMock from './MockData/BackendMock.js';
import {connect} from 'react-refetch';

class ConnectionComponent extends Component {

	render(promiseState) {
		if (promiseState.pending) {
			return <LoadingAnimation/>;
		} else if (promiseState.rejected) {
			return <ErrorMessage message={promiseState.reason.message}/>;
		}
		return null;
	}
	
	static switchFetch(input, init) {
		if(config.useBackendMock) {
			const response = BackendMock.handleRequest(input, init);
			return new Promise(resolve => resolve(response));
		} else {
			const req = new Request(input, init);
			return fetch(req);
		}
	}

	static argosConnector() {
		return connect.defaults({
			handleResponse: function (response) {
				if(response.headers.get('content-type').includes('text/plain')
					&& response.headers.get('content-length') !== '0') {
					return response.text();

				} else if(response.headers.get('content-type').includes('application/json')
					&& response.headers.get('content-length') !== '0') {
					const json = response.json();

					if (response.status >= 200 && response.status < 300) {
						return json;
					} else {
						return json.then(function (cause) {
							return Promise.reject(cause);
						});
					}
				}
			},
			fetch: ConnectionComponent.switchFetch
		});
	}
	
} export default ConnectionComponent;
