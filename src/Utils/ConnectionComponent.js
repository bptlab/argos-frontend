import React, {Component} from 'react';
import LoadingAnimation from './../Utils/LoadingAnimation';
import ErrorMessage from './../Utils/ErrorMessage';

class ConnectionComponent extends Component {

	render(promiseState) {
		if (promiseState.pending) {
			return <LoadingAnimation/>;
		} else if (promiseState.rejected) {
			return <ErrorMessage message={promiseState.reason.message}/>;
		}
		return null;
	}
	
} export default ConnectionComponent;