import React, { Component } from 'react';
import IconWarning from 'material-ui/svg-icons/alert/warning';
import { css } from 'aphrodite';
import AppStyles from '../AppStyles';
import ErrorMessageStyles from './ErrorMessageStyles';

class ErrorMessage extends Component {
	
	render() {
		return (
			<div className={css(AppStyles.dFlex, AppStyles.alignItemsCenter, AppStyles.flexDirectionColumn)}>
				<IconWarning className={css(AppStyles.errorColor, ErrorMessageStyles.iconSize)}/>
				<p>{this.props.message.toString()}</p>
			</div>
		);
	}
}

export default ErrorMessage;