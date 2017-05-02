import React, { Component } from 'react';
import config from './../config/config';
import { css } from 'aphrodite';
import Chart from 'chart.js';

class EventDiagram extends Component {
	componentDidMount() {
		const chart = document.getElementById("event-diagram");
		const data = {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [
				{
					label: "Event Type 1",
					lineTension: 0,
					borderColor: config.colors.diagramLine,
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					fill: true,
					backgroundColor: config.colors.diagramBackground,
					pointRadius: 1,
					pointHitRadius: 10,
					pointBackgroundColor: config.colors.diagramLine,
					pointBorderWidth: 0,
					pointHoverRadius: 3,
					pointHoverBackgroundColor: config.colors.diagramLine,
					pointHoverBorderWidth: 2,
					pointHoverBorderColor: config.colors.diagramLine,
					data: [65, 59, 80, 81, 56, 55, 40],
					spanGaps: false,
				}
			]
		};
		const options = {

		};
		Chart.Line(chart, {
			data: data,
			options: options
		});
	}

	render() {
		return (
			<div className={css(this.props.styles)}>
				<canvas id="event-diagram" width="400" height="315"/>
			</div>
		);
	}
}

export default EventDiagram;