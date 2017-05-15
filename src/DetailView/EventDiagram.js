import React, { Component } from 'react';
import { css } from 'aphrodite';
import plotly from 'plotly.js/dist/plotly.min';
import Utils from './../Utils/Utils';

class EventDiagram extends Component {

	static sortEventsByTime(eventA, eventB, timeStampAttributeName) {
		const dateA = new Date(EventDiagram.getTimeStampAsStringFromEvent(eventA, timeStampAttributeName));
		const dateB = new Date(EventDiagram.getTimeStampAsStringFromEvent(eventB, timeStampAttributeName));
		return dateA - dateB;
	}

	static getTimeStampAsStringFromEvent(event, timeStampAttributeName) {
		return event.Attributes.find(attribute =>
			attribute.Name === timeStampAttributeName).Value;
	}

	static getDateAsStringFromEvent(event, timeStampAttributeName) {
		return EventDiagram
			.getTimeStampAsStringFromEvent(event, timeStampAttributeName)
			.split("T")[0];
	}

	componentWillReceiveProps(props) {
		this.buildChartDataset(props);
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
		const timeStampAttributeName = eventTypeAttributes.find(attribute =>
			attribute.Id === eventType.TimestampAttributeId).Name;

		const sortedEvents = events;

		sortedEvents.sort((eventA, eventB) => {
			return EventDiagram.sortEventsByTime(eventA, eventB, timeStampAttributeName);
		});

		//build x-axis
		sortedEvents.forEach(event => {
			eventCounter += 1;
			const eventDate = EventDiagram.getDateAsStringFromEvent(event, timeStampAttributeName);
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

		const layout = {
			yaxis: {
				nticks: eventCounter + 2,
			},
			xaxis: {
				showgrid: false,
			},
			height: 400
		};

		const statusColor = Utils.getStatus(entity.Status).color;

		let diagramData = {
			x: x,
			y: y,
			type: 'line',
			line: {
				color: statusColor
			}
		};

		if (eventCounter !== 1) {
			diagramData.fill = 'tozeroy';
			diagramData.fillcolor = statusColor + '80';
		}

		plotly.newPlot(
			"eventDiagram",
			[diagramData],
			layout
		);
	}

	render() {
		return (
			<div id="eventDiagram" className={css(this.props.styles)} />
		);
	}
}

export default EventDiagram;