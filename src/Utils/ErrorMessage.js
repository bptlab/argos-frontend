import React, { Component } from 'react';
import IconWarning from 'material-ui/svg-icons/alert/warning';
import { css } from 'aphrodite';
import AppStyles from './../App-styles';
import DefinitionStyles from './../Definition-styles';
import ErrorMessageStyles from './ErrorMessage-styles';

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