import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import config from './../config/config';
import { css } from 'aphrodite';
import AppStyles from '../AppStyles';

class SearchBar extends Component {
	constructor () {
		super();
		this.styles = {
			primaryBorderColor: {
				borderColor: config.colors.primaryColor,
			}
		}
	}

	render() {
		return (
			<div className={css(this.props.styles)}>
				<TextField
					hintText="Search"
					className={css(AppStyles.w100)}
				/>
			</div>
		);
	}
}

export default SearchBar;