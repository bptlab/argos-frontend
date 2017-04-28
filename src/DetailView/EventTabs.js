import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';
import config from './../config/config';
import { css } from 'aphrodite';
import DefinitionStyles from './../DefinitionStyles';
injectTapEventPlugin();

class EventTabs extends Component {
	render() {
		return (
			<Tabs className={css(this.props.styles)}>
				<Tab label="Item One"/>
				<Tab label="Item Two"/>
				<Tab label="Item Tree"/>
			</Tabs>
		);
	}
}

export default EventTabs;