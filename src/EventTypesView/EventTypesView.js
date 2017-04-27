import React, { Component } from 'react';
import EventType from './EventType';
import SearchBar from './../Utils/SearchBar';


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
				<SearchBar/>
				<EventType/>
				<EventType/>
				<EventType/>
			</div>
		);
	}
}

export default EventTypesView;
