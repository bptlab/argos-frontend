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

	getStatusIndex(status, statuses) {
		return statuses.findIndex((currentStatus) => {
			return currentStatus.name === status;
		})
	}

	forgeChartData() {
		let data = [];
		let statuses = config.statuses;
		statuses.forEach((status) => {
			status.entityCounter = 0;
		});

		this.props.entities.value.forEach((entity) => {
			const currentStatusIndex = this.getStatusIndex(entity.Status, statuses);
			if(currentStatusIndex) {
				statuses[currentStatusIndex].entityCounter++;
			}
			else {
				const undefinedStatusIndex = this.getStatusIndex('UNDEFINED', statuses);
				statuses[undefinedStatusIndex].entityCounter++;
			}
		});

		// const status = {percentage: 70, name: 'RUNNING'};
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