import React, { Component } from 'react';
import IconWarning from 'material-ui/svg-icons/alert/warning';
import { css } from 'aphrodite';
import AppStyles from '../AppStyles';
import DefinitionStyles from '../DefinitionStyles';
import ErrorMessageStyles from './ErrorMessageStyles';

class ErrorMessage extends Component {
	
	render() {
		return (
			<div className={css(AppStyles.dFlex, AppStyles.alignItemsCenter, AppStyles.flexDirectionColumn)}>
				<IconWarning className={css(DefinitionStyles.errorColor, ErrorMessageStyles.iconSize)}/>
				<p dangerouslySetInnerHTML={{__html: this.props.message}} />
			</div>
		);
	}
}

export default ErrorMessage;