import React, { Component } from 'react';
import Utils from './../Utils/Utils';
import help from "./../config/help";
const plotly = require('plotly.js');

class EventDiagram extends Component {

	constructor(props) {
		super(props);
		this.diagramId = "eventDiagram";
	}

	componentWillReceiveProps(props) {
		this.buildChartDataset(props);
	}

	componentDidMount() {
		this.buildChartDataset(this.props);
	}

	static getDiagramLayout(eventCounter) {
		return {
			yaxis: {
				dtick: eventCounter.toString().slice(0,-1),
				nticks: eventCounter + 2,
			},
			xaxis: {
				showgrid: false,
			},
			height: 400,
			margin: {pad: 10}
		};
	}

	static getTrace(x, y, entity) {
		const statusColor = Utils.getColorForStatus(entity.Status);
		const opacityFactor = '80';
		const traceData = {
			x: x,
			y: y,
			type: 'line',
			line: {
				color: statusColor
			}
		};
		if (x.length !== 1) {
			traceData.fill = 'tozeroy';
			traceData.fillcolor = statusColor + opacityFactor;
		}
		return [traceData];
	}

	buildChartDataset(props) {
		const {events, eventType, eventTypeAttributes, entity} = props;
		if (!events) {
			return;
		}

		const x = [];
		const y = [];
		const dateCounter = {};
		let eventCounter = 0;
		const timeStampAttributeName = Utils.getTimeStampAttributeName(eventType, eventTypeAttributes);

		const sortedEvents = Utils.sortEvents(events, timeStampAttributeName);

		//build x-axis
		sortedEvents.forEach(event => {
			eventCounter += 1;
			const eventDate = Utils.getDateAsStringFromEvent(event, timeStampAttributeName);
			const currentDateCount = dateCounter[eventDate];
			if (!currentDateCount) {
				dateCounter[eventDate] = eventCounter;
				x.push(eventDate);
			}
			else {
				dateCounter[eventDate] = currentDateCount + 1;
			}
		});

		//build y-axis
		x.forEach(date =>
			y.push(dateCounter[date]));

		plotly.newPlot(
			this.diagramId,
			EventDiagram.getTrace(x, y, entity, eventCounter),
			EventDiagram.getDiagramLayout(eventCounter)
		);
	}

	render() {
		return (
			<div
				id={this.diagramId}
				className={this.props.className}
				data-hint={help.diagram.eventsOverTime}
				data-hintPosition="middle-right" />
		);
	}
}

export default EventDiagram;