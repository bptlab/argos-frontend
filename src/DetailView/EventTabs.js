import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { css } from 'aphrodite';
import config from './../config/config';
injectTapEventPlugin();

class EventTabs extends Component {

	componentWillMount() {
		if (this.props.eventTypes.length > 0) {
			this.props.onEventTypeChange(this.props.eventTypes);
		}
	}

	getTabs() {
		if (this.props.eventTypes.length > 0) {
			return (
				this.props.eventTypes.map((eventType, key) => {
					return (
						<Tab
							label={eventType.Name}
							onClick={() => this.props.onEventTypeChange([eventType])}
							key={key} />
					);
				})
			);
		}
		else {
			return (
				<Tab label={config.messages.noEventTypes} />
			);
		}
	}

	render() {
		return (
			<Tabs className={css(this.props.styles)}>
				{this.getTabs()}
			</Tabs>
		);
	}
}

export default EventTabs;