import React, { Component } from 'react';
import EventType from './EventType';


class EventTypesView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		};
	}
	render() {
		return (
			<div>
				<EventType/>
				<EventType/>
				<EventType/>
			</div>
		);
	}
}

export default EventTypesView;
