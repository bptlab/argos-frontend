import React, { Component } from 'react';
import IconWarning from 'material-ui/svg-icons/alert/warning';
import './ErrorMessage.css'

class ErrorMessage extends Component {
	
	render() {
		return (
			<div className="d-flex align-items-center flex-direction-column">
				<IconWarning className="error-icon"/>
				<p dangerouslySetInnerHTML={{__html: this.props.message}} />
			</div>
		);
	}
}

export default ErrorMessage;