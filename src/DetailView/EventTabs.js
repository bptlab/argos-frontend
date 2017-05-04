import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { css } from 'aphrodite';
injectTapEventPlugin();

class EventTabs extends Component {
    changeEventType() {
    }

    getTabs() {
        if (this.props.eventTypes.length > 0) {
            return (
                this.props.eventTypes.map((eventType, key) => {
                    return (
						<Tab
							label={eventType.Name}
							onClick={this.changeEventType} />
                    );
                })
            );
        }
        else {
            return (
				<Tab label="No event types" />
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