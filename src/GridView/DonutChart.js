import React, { Component } from 'react';
import { css } from 'aphrodite';
import plotly from 'plotly.js/src/core';

class DonutChart extends Component {
	componentDidMount() {
		const TESTER = document.getElementById('tester');
		plotly.plot( TESTER, [{
			x: [1, 2, 3, 4, 5],
			y: [1, 2, 4, 8, 16] }], {
			margin: { t: 0 } } );
	}

	render() {
		return (
			<div className={css(this.props.styles)}>
				<div id="tester" />
			</div>
		);
	}
}

export default DonutChart;