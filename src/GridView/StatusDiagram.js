import React, { Component } from 'react';
import { css } from 'aphrodite';
import plotly from 'plotly.js/dist/plotly';
import config from '../config/config';

class DonutChart extends Component {
	componentDidMount() {
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
		};

		const modeBar = {
			displayModeBar: false
		};

		const data = this.forgeChartData();

		plotly.plot('status-diagram', data, layout, modeBar);
	}



	forgeChartData() {
		let data = [];
		// let status = config.status;
		//
		// this.props.entities.forEach((entity) => {
		// 	if(entity.Status in status) {
		//
		// 	}
		// });

		const status = {percentage: 70, name: 'RUNNING'};
		const dataSet = this.forgeDataSet(status);
		data = data.concat([dataSet]);

		return data;
	}

	forgeDataSet(status) {
		return {
			y: ['status'],
			x: [status.percentage],
			name: status.name,
			type: 'bar',
			orientation: 'h',
			width: 50,
			marker:{
				color: ['#000000']
			},
		};
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