import React from 'react';
import {Container} from "react-grid-system";
import {connect} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import Header from './../Header';
import EventType from './EventType';
import SearchBar from './../Utils/SearchBar';
import { Row } from 'react-grid-system';
import { css } from 'aphrodite';
import AppStyles from "./../AppStyles";
import { Card, CardHeader, CardText } from 'material-ui/Card';
import config from './../config/config';
import ErrorMessage from './../Utils/ErrorMessage.js';


class SettingsView extends ConnectionComponent {

	render() {
		const connectionIncomplete = super.render(this.props.eventTypes);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		const optionalActions = this.props.deleteEventTypeResponse;
		return (
			<div>
				<Header title="Settings"/>
				<Container className={css(AppStyles.elementMarginTop)}>
					<Row>
						<Card>
							<CardHeader
								title="Event Types"
								actAsExpander={true}
								showExpandableButton={true} />
							<CardText expandable={true}>
								<Container>
									<SearchBar fullWidth="true"/>
									{this.props.eventTypes.value.map((eventType) => {
										return(<EventType
											eventType={eventType}
											key={eventType.Id}
											deleteEventType={this.props.deleteEventType}
											fullWidth="true"/>);
									})}
								</Container>
							</CardText>
						</Card>
					</Row>
				</Container>
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(() => ({
	eventTypes: config.backendRESTRoute + `/eventtypes`,
	deleteEventType: eventType => ({
		deleteEventTypeResponse: {
			url: config.backendRESTRoute + `/eventtype/${eventType.Id}/delete`,
			method: 'DELETE',
			body: "",
			andThen: () => ({
				eventTypes: {
					url: config.backendRESTRoute + `/eventtypes`,
					refreshing: true
				}
			})
		}
	})
}))(SettingsView);
