import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import "./../App.css";

class LoadingAnimation extends Component {
	render() {
		const size = this.props.size || 80;
		const thickness = this.props.thickness || 5;
		return (
			<div className="dFlex justifyContentCenter">
				<CircularProgress size={size} thickness={thickness} />
			</div>
		);
	}
}

export default LoadingAnimation;