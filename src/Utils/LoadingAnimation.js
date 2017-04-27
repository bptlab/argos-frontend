import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { css } from 'aphrodite';
import AppStyles from './../App-styles';

class LoadingAnimation extends Component {
	render() {
		return (
			<div className={css(AppStyles.dFlex, AppStyles.justifyContentCenter)}>
				<CircularProgress size={80} thickness={5} />
			</div>
		);
	}
}

export default LoadingAnimation;