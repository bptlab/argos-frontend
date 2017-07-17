import React, { Component } from 'react';
import IconWarning from 'material-ui/svg-icons/alert/warning';
import { css } from 'aphrodite';
import AppStyles from '../AppStyles';

class ErrorMessage extends Component {
	
	render() {
		return (
			<div className="dFlex alignItemsCenter flexDirectionColumn">
				<IconWarning className={css(AppStyles.errorColor) + "iconSize"}/>
				<p>{this.props.message.toString()}</p>
			</div>
		);
	}
}

export default ErrorMessage;