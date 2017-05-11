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
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import config from './../config/config';

class SettingsView extends ConnectionComponent {

	getCreateButton() {
		return <IconButton href="settings/eventType/create"><IconAdd/></IconButton>
	}
	render() {
		const connectionIncomplete = super.render(this.props.eventTypes);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		return (
			<div>
				<Header title="Settings"/>
				<Container className={css(AppStyles.elementMarginTop)}>
					<Row>
						<Card initiallyExpanded={true}>
							<CardHeader
								title="Event Types"
								actAsExpander={true}
								showExpandableButton={true}/>
							<CardText expandable={true}>
								<Container>
									<SearchBar fullWidth={true}/>
									{this.props.eventTypes.value.map((eventType) => {
										return(<EventType
											eventType={eventType}
											key={eventType.Id}
											deleteEventType={this.props.deleteEventType}
											fullWidth="true"/>);
									})}
								</Container>
							</CardText>
							<CardActions>
								<IconButton href="settings/eventType/create"><IconAdd/></IconButton>
							</CardActions>
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
		postLikeResponse: {
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
