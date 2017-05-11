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
		return statuses.findIndex((currentStatus) => {
			return currentStatus.name === status;
		})
	}

	componentDidMount() {
		const data = this.forgeChartData();
		const chartRangeMaximum = StatusDiagram.getChartRangeMaximum(data);
		const layout = StatusDiagram.getChartLayout(chartRangeMaximum);
		const modeBar = { displayModeBar: false };
		plotly.plot('status-diagram', data, layout, modeBar);
	}

	forgeChartData() {
		let statuses = config.statuses;
		statuses.forEach((status) => {
			status.entityCounter = 0;
		});

		this.props.entities.value.forEach((entity) => {
			let currentStatusIndex = StatusDiagram.getStatusIndex(entity.Status, statuses);
			if(currentStatusIndex < 0) {
				currentStatusIndex = StatusDiagram.getStatusIndex('UNDEFINED', statuses);
			}
			statuses[currentStatusIndex].entityCounter++;
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

export default StatusDiagram;