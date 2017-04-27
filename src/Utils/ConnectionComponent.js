import React, {Component} from 'react';
import LoadingAnimation from './../Utils/LoadingAnimation';
import ErrorMessage from './../Utils/ErrorMessage';
import Config from './../config/config.js';
import BackendMock from './MockData/BackendMock.js';

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
		if(Config.useBackendMock) {
			const promise = new Promise(resolve => resolve(BackendMock.handleRequest(input, init)));
			console.log(promise);
			return promise;
		} else {
			const req = new Request(input, init);
			return fetch(req);
		}
	}
	
} export default ConnectionComponent;