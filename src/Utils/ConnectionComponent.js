import React, {Component} from 'react';
import LoadingAnimation from './../Utils/LoadingAnimation';
import ErrorMessage from './../Utils/ErrorMessage';
import config from './../config/config.js';
import BackendMock from './MockData/BackendMock.js';
import {connect} from 'react-refetch';
import ChangeNotifier from './ChangeNotifier.js';
import ConnectionCache from './ConnectionCache';

class ConnectionComponent extends Component {

	constructor(props) {
		super(props);
		if(!window.changeNotifier) {
			window.changeNotifier = new ChangeNotifier();
		}
	}
	
	registerNotification(artifactType, artifactId, notificationCallback) {
		window.changeNotifier.register(artifactType, artifactId, notificationCallback);
	}
	
	unregisterAllNotifications() {
		window.changeNotifier.unregisterAll();
	}

	render(promiseState) {
		if (promiseState.pending) {
			return <LoadingAnimation/>;
		} else if (promiseState.rejected) {
			return <ErrorMessage message={promiseState.reason.message}/>;
		}
		return null;
	}

	static switchFetch(input, init) {
		if (config.useBackendMock) {
			const response = BackendMock.handleRequest(input, init);
			return new Promise(resolve => resolve(response));
		}
		if (config.enableCaching) {
			const data = ConnectionCache.get(input.url);
			if (data) {
				const response = BackendMock.buildResponse(data);
				console.log("Cached: " + input.url);
				return new Promise(resolve => resolve(response));
			}
		}
		const req = new Request(input, init);
		return fetch(req);
	}

	static argosConnector() {
		return connect.defaults({
			handleResponse: function (response) {
				/* Save response to cache */
				if (config.enableCaching && response.status >= 200 && response.status < 300) {
					const cacheResponse = response.clone();
					ConnectionCache.add(cacheResponse);
				}

				if(response.headers.get('content-type').includes('text/plain')
					&& response.headers.get('content-length') !== '0') {
					if (response.status >= 200 && response.statusCode < 300) {
						return response.text();
					} else {
						return response.text().then(function (cause) {
							return Promise.reject(cause);
						});
					}

				} else if (response.headers.get('content-type').includes('application/json')
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

}
export default ConnectionComponent;
