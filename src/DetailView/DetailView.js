import React, { Component } from 'react';
import EntityInformation from './EntityInformation';
import EventDiagram from './EventDiagram';
import SearchBar from './../Utils/SearchBar';
import EventTabs from './EventTabs';
import EventTable from './EventTable';

class DetailView extends Component {
	render() {
		return (
			<div>
				<EntityInformation/>
				<EventDiagram/>
				<SearchBar/>
				<EventTabs/>
				<EventTable/>
			</div>
		);
	}
}

export default DetailView;