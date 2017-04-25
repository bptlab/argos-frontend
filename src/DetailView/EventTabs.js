import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class EventTabs extends Component {
	render() {
		return (
			<Tabs>
				<Tab label="Item One"/>
				<Tab label="Item Two"/>
				<Tab label="Item Tree"/>
			</Tabs>
		);
	}
}

export default EventTabs;