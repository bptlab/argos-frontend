import React, { Component } from 'react';
import { css } from 'aphrodite';
import plotly from 'plotly.js/dist/plotly';
import config from '../config/config';

class StatusDiagram extends Component {
	static getChartLayout(chartRangeMaximum) {
		return {
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
	}

	static getChartRangeMaximum(data) {
		let chartRangeMaximum = 0;
		data.forEach((dataSet) => {
			dataSet.x.forEach((xValue) => {
				chartRangeMaximum += xValue;
			})
		});
		return chartRangeMaximum;
	}

	static getStatusIndex(status, statuses) {
		let statusIndex = statuses.findIndex((currentStatus) => {
			return currentStatus.name === status;
		});
		if (statusIndex < 0) {
			statusIndex = statuses.findIndex((currentStatus) => {
				return currentStatus.name === 'UNDEFINED';
			});
		}
		return statusIndex;
	}

	componentDidMount() {
		this.componentDidUpdate();
	}
	componentDidUpdate() {
		const data = this.forgeChartData();
		const chartRangeMaximum = StatusDiagram.getChartRangeMaximum(data);
		const layout = StatusDiagram.getChartLayout(chartRangeMaximum);
		const modeBar = { displayModeBar: false };
		plotly.newPlot('status-diagram', data, layout, modeBar);
	}

	forgeChartData() {
		const statuses = config.statuses;
		statuses.forEach((status) => {
			status.entityCounter = 0;
		});

		this.props.entities.forEach((entity) => {
			const currentStatusIndex = StatusDiagram.getStatusIndex(entity.Status, statuses);
			statuses[currentStatusIndex].entityCounter++;
		});

		const data = [];
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

export default StatusDiagram;