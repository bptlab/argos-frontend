import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import config from './../config/config';
import { css } from 'aphrodite';
import AppStyles from './../App-styles';

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
			<div>
				<TextField
					hintText="Search"
					className={css(AppStyles.w100)}
					underlineFocusStyle={this.styles.primaryBorderColor}
				/>
			</div>
		);
	}
}

export default SearchBar;