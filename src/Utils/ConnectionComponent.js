import React, {Component} from 'react';
import LoadingAnimation from './../Utils/LoadingAnimation';
import ErrorMessage from './../Utils/ErrorMessage';
import config from './../config/config.js';
import RestRoutesManager from './RestRoutesManager';
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

	addSnackbarNotification(message, mode) {
		window.sessionStorage.setItem('notificationMessage',
			JSON.stringify({message: message, mode: mode}));
	}

	render(promiseState) {
		if (promiseState.pending) {
			return <LoadingAnimation/>;
		} else if (promiseState.rejected) {
			return <ErrorMessage message={promiseState.reason.message}/>;
		}
		return null;
	}

	static handleMockRequest(request) {
		const mockData = RestRoutesManager.executeMockFunction(request);
		return ConnectionComponent.buildResponse(mockData);
	}

	static cacheResponse(response) {
		if (!response.url || !config.enableCaching || !RestRoutesManager.shouldBeCached(response.url)) {
			return;
		}
		if (response.status < 200 || response.status >= 300) {
			return;
		}
		const cacheResponse = response.clone();
		ConnectionCache.add(cacheResponse);
	}

	static buildResponse(value) {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return new Response(JSON.stringify(value), {status: 200, statusText: "OK", headers: headers});
	}

	static buildPromise(response) {
		return new Promise(resolve => resolve(response));
	}
	
	static switchFetch(input, init) {
		if(config.useBackendMock) {
			return ConnectionComponent.buildPromise(
				ConnectionComponent.handleMockRequest(input, init));
		}
		if (config.enableCaching) {
			const data = ConnectionCache.get(input.url);
			if (data) {
				return ConnectionComponent.buildPromise(
					ConnectionComponent.buildResponse(data));
			}
		}
		const req = new Request(input, init);
		return fetch(req);
	}

	static argosConnector() {
		return connect.defaults({
			handleResponse: function (response) {
				/* Save response to cache */
				ConnectionComponent.cacheResponse(response);

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
