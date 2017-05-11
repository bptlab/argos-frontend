import React, { Component } from 'react';
import { css } from 'aphrodite';
import plotly from 'plotly.js/dist/plotly.min';

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

	componentDidMount() {
		this.buildChartDataset(this.props);
	}

	componentWillReceiveProps(props) {
		this.buildChartDataset(props);
	}

	buildChartDataset(props) {
		const {events, eventType, eventTypeAttributes} = props;
		const x = [];
		const y = [];
		const dateCounter = {};
		let eventCounter = 0;
		const timeStampAttributeName = eventTypeAttributes.find(attribute =>
			attribute.Id === eventType.TimestampAttributeId).Name;

		let counter = 0;
		const sortedEvents = events;
		if (!events) {
			return;
		}

		var layout = {
			width: 500,
			height: 500
		};

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

		console.log(x);
		console.log(y);

		plotly.newPlot(
			"eventDiagram",
			[{x: x, y: y }],
			layout
		);

		//
		// return({
		// 	label: eventType.name,
		// 	fill: true,
		// 	lineTension: 0.1,
		// 	backgroundColor: this.backgroundColor,
		// 	borderColor: this.borderColor,
		// 	pointBorderWidth: 5,
		// 	pointHoverRadius: 8,
		// 	pointRadius: 1,
		// 	pointHitRadius: 10,
		// 	data: dataContainer
		// });

	}

	render() {
		return (
			<div id="eventDiagram" className={css(this.props.styles)} />
		);
	}
}

export default EventDiagram;