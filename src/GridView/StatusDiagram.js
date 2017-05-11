import React, { Component } from 'react';
import { css } from 'aphrodite';
import plotly from 'plotly.js/dist/plotly';
import config from '../config/config';

class DonutChart extends Component {
	componentDidMount() {
		const data = this.forgeChartData();
		const chartRangeMaximum = this.getChartRangeMaximum(data);
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
				range: [0, chartRangeMaximum]
			},
			yaxis: {
				visible: false,
				fixedrange: true
			},
		};
		const modeBar = {
			displayModeBar: false
		};

		plotly.plot('status-diagram', data, layout, modeBar);
	}

	getChartRangeMaximum(data) {
		let chartRangeMaximum = 0;
		data.forEach((dataSet) => {
			dataSet.x.forEach((xValue) => {
				chartRangeMaximum += xValue;
			})
		});
		return chartRangeMaximum;
	}

	getStatusIndex(status, statuses) {
		return statuses.findIndex((currentStatus) => {
			return currentStatus.name === status;
		})
	}

	forgeChartData() {
		let statuses = config.statuses;
		statuses.forEach((status) => {
			status.entityCounter = 0;
		});

		this.props.entities.value.forEach((entity) => {
			const currentStatusIndex = this.getStatusIndex(entity.Status, statuses);
			if(currentStatusIndex >= 0) {
				statuses[currentStatusIndex].entityCounter++;
			}
			else {
				const undefinedStatusIndex = this.getStatusIndex('UNDEFINED', statuses);
				statuses[undefinedStatusIndex].entityCounter++;
			}
		});

		let data = [];
		statuses.forEach((status) => {
			data.push(this.forgeDataSet(status));
		});

		return data;
	}

	forgeDataSet(status) {
		return {
			y: ['status'],
			x: [status.entityCounter],
			name: status.name,
			type: 'bar',
			orientation: 'h',
			width: 50,
			marker:{
				color: [status.color]
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