import React, { Component } from 'react';
import { css } from 'aphrodite';
import plotly from 'plotly.js/dist/plotly';

class DonutChart extends Component {
	componentDidMount() {
		const trace1 = {
			y: ['giraffes'],
			x: [20],
			name: 'SF Zoo',
			type: 'bar',
			orientation: 'h',
			width: 50
		};

		const trace2 = {
			y: ['giraffes'],
			x: [80],
			name: 'LA Zoo',
			type: 'bar',
			orientation: 'h',
			width: 50
		};

		const data = [trace1, trace2];

		const layout = {
			barmode: 'stack',
			showlegend: false,
			autosize: true,
			height: 25,
			hovermode: false,
			margin: {
				l: 0,
				r: 0,
				b: 0,
				t: 0,
			},
			xaxis: {
				visible: false,
				fixedrange: true,
				range: [0, 100]
			},
			yaxis: {
				visible: false,
				fixedrange: true
			},
			paper_bgcolor: '#7f7f7f',
			plot_bgcolor: '#c7c7c7'
		};

		const modeBar = {
			displayModeBar: false
		};

		plotly.plot('status-diagram', data, layout, modeBar);
	}

	render() {
		return (
			<div className={css(this.props.styles)}>
				<div id="status-diagram" />
			</div>
		);
	}
}

export default DonutChart;