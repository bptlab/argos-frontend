import React from 'react';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import EventQueryListItem from  './EventQueryListItem.js';
import EntityMappingListItem from  './EntityMappingListItem.js';
import config from './../config/config.js';
import help from "./../config/help";
import { PromiseState } from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconAdd from "material-ui/svg-icons/content/add";
import ConfirmationMessage from './../Utils/ConfirmationMessage.js';
import Notification from './../Utils/Notification';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Utils from './../Utils/Utils';
import "./../App.css";
import "./EntityMappingListItem.css";

class EventTypeCard extends ConnectionComponent {

	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			mappingExpanded: false,
		};
		this.handleExpandChange = this.handleExpandChange.bind(this);
		this.handleMappingsExpandChange = this.handleMappingsExpandChange.bind(this);
		this.handleEventTypeDeletion = this.handleEventTypeDeletion.bind(this);
	}
	
	handleExpandChange(expanded) {
		this.setState({expanded: expanded});
	}
	
    handleMappingsExpandChange(expanded) {
		this.setState({mappingExpanded: expanded});
	}
	
	handleEventTypeDeletion() {
		this.props.deleteEventType(this.props.eventType);
	}

	determineNotification(optionalActions) {
		if (optionalActions && optionalActions.rejected) {
			Notification.addSnackbarNotificationOnSelf(optionalActions.reason,
				Notification.ModeEnum.ERROR);
		} else if (optionalActions && optionalActions.fulfilled && optionalActions === this.props.deleteQueryResponse) {
			Notification.addSnackbarNotificationOnSelf(help.messages.deletedQueryMessage,
				Notification.ModeEnum.SUCCESS);
		} else if (optionalActions && optionalActions.fulfilled && optionalActions === this.props.deleteMappingResponse) {
			Notification.addSnackbarNotificationOnSelf(help.messages.deletedEntityMappingMessage,
				Notification.ModeEnum.SUCCESS);
		}
	}
	
	getEventTypeHeaderButtons() {
		return [
			<IconButton
				tooltip={help.button.deleteEventType + " \"" + this.props.eventType.Name + "\""}
				key="delete-button"
				onTouchTap={() => {
					this.confirmationMessage.handleOpen();}}
				className="marginRightBig">
				<IconDelete/>
			</IconButton>];
	}

	getAttributesTab(attributes) {
		return(
			<Tab
				label={help.descriptions.attributes}
				data-hint={help.display.settingsView.eventTypeAttributes}
				data-hintPosition="top-middle">
				<List>
					{attributes.map((attribute) => {
							return(
								<ListItem
									primaryText={attribute.Name}
									key={attribute.Id}
								/>);
						}
					)}
				</List>
			</Tab>
		);
	}
	getEventQueriesTab(queries) {
		return(
			<Tab
				label={help.descriptions.queries}
			    data-hint={help.display.settingsView.eventTypeQueries}
			    data-hintPosition="top-middle">
				<List>
					{queries.length === 0 &&
					<div className="mapping-headline"> {help.messages.noEventQueries} </div>}
					{queries.map((query) => {
							return(
								<EventQueryListItem
									eventType={this.props.eventType}
									query={query}
									deleteQuery={this.props.deleteQuery}
									key={query.Id}/>);
						}
					)}
				</List>
				<FloatingActionButton
					backgroundColor={config.colors.primaryDark}
					className="floatRight"
					href={Utils.getLink(`settings/eventType/${this.props.eventType.Id}/eventQuery/create`)}
					children={<IconAdd/>}
					title={help.button.createEventQuery}
					mini={true} />
			</Tab>
		);
	}

	getEntityMappingsTab(entityMappings, attributes) {
		return(
			<Tab
				label={help.descriptions.entityMappings}
			    data-hint={help.display.settingsView.entityMappings}
			    data-hintPosition="top-middle">
				<div className="autoOverFlow">
					<List>
						{entityMappings.length === 0 &&
						<div className="mapping-headline"> {help.messages.noEntityMappings} </div>}
						{entityMappings.map((mapping, index) => {
							return (
								<div key={index}>
									<EntityMappingListItem
										mapping={mapping}
										deleteMapping={this.props.deleteMapping}
										eventType={this.props.eventType}
										eventTypeAttributes={attributes}/>
									{index !== (entityMappings.length - 1) &&
										<Divider style={{
											backgroundColor: config.colors.accent,
											marginTop: '20px',
											marginBottom: '20px'}}
										/>
									}
								</div>
							);
						})}
					</List>
					<FloatingActionButton
						backgroundColor={config.colors.primaryDark}
						className="floatRight marginBottomSmall"
						href={Utils.getLink('settings/entityMapping/' + this.props.eventType.Id + '/create')}
						children={<IconAdd/>}
						title={help.button.createEntityMapping}
						mini={true} />
				</div>
			</Tab>
		);
	}
	
	render() {
		const allFetches = PromiseState.all([this.props.entityMappings, this.props.queries, this.props.attributes]);
        const optionalActions = this.props.deleteQueryResponse || this.props.deleteMappingResponse;
        const queries = this.props.queries.value;
        const attributes = this.props.attributes.value;
        const entityMappings = this.props.entityMappings.value;
        const connectionIncomplete = super.render(allFetches);
        if(connectionIncomplete) {
            return connectionIncomplete;
		}
		this.determineNotification(optionalActions);

		return (
			<div>
				<ConfirmationMessage
					actionToPerform={this.handleEventTypeDeletion}
					ref={(input) => {this.confirmationMessage = input;}}
					onSnackbarMessage={this.props.onSnackbarMessage}>
					{help.messages.deleteEventTypeMessage}
				</ConfirmationMessage>
				<Card
					expanded={this.state.expanded}
					onExpandChange={this.handleExpandChange}>
					<CardHeader
						title={this.props.eventType.Name}
						subtitle={`${help.display.settingsView.textNumberOfEvents} ${this.props.eventType.NumberOfEvents}`}
						actAsExpander={true}
						showExpandableButton={true}
						children={this.getEventTypeHeaderButtons()}
						className="dFlex flexDirectionRow justifyContentSpace"/>
					<CardText
						expandable={true}>
						<Tabs>
							{this.getAttributesTab(attributes)}
							{this.getEventQueriesTab(queries)}
							{this.getEntityMappingsTab(entityMappings, attributes)}
						</Tabs>
					</CardText>
				</Card>
			</div>
		);
	}
} export default ConnectionComponent.argosConnector()(props => ({
	queries: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/queries`,
	attributes: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/attributes`,
    entityMappings: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/entitymappings`,
	deleteQuery: query => ({
		deleteQueryResponse: {
			url: config.backendRESTRoute + `/eventquery/${query.Id}/delete`,
			method: 'DELETE',
			andThen: () => ({
				queries: {
					url: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/queries`,
					refreshing: true,
					force: true
				}
			})
		}
	}),
    deleteMapping: mapping => ({
        deleteMappingResponse: {
            url: config.backendRESTRoute + `/entitymapping/${mapping.Id}/delete`,
            method: 'DELETE',
            andThen: () => ({
                entityMappings: {
                    url: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/entitymappings`,
                    refreshing: true,
                    force: true
                }
            })
        }
    })
}))(EventTypeCard);