import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { css } from 'aphrodite';
import AppStyles from '../AppStyles';

class LoadingAnimation extends Component {
	render() {
		const size = this.props.size || 80;
		const thickness = this.props.thickness || 5;
		return (
			<div className={css(AppStyles.dFlex, AppStyles.justifyContentCenter)}>
				<CircularProgress size={size} thickness={thickness} />
			</div>
		);
	}
}

export default LoadingAnimation;