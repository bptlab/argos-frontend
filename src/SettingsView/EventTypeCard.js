import React from 'react';
import {Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Utils from '../Utils/Utils';
import EventQueryListItem from  './EventQueryListItem.js';
import EntityMappingListItem from  './EntityMappingListItem.js';
import config from './../config/config.js';
import help from "./../config/help";
import { Col, Container } from 'react-grid-system';
import { PromiseState } from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import ConfirmationMessage from './../Utils/ConfirmationMessage.js';
import Notification from './../Utils/Notification';
import {css} from "aphrodite";
import AppStyles from "./../AppStyles";

class EventType extends ConnectionComponent {

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
			Notification.addSnackbarNotificationOnSelf(config.messages.deletedQueryMessage,
				Notification.ModeEnum.SUCCESS);
		} else if (optionalActions && optionalActions.fulfilled && optionalActions === this.props.deleteMappingResponse) {
			Notification.addSnackbarNotificationOnSelf(config.messages.deletedEntityMappingMessage,
				Notification.ModeEnum.SUCCESS);
		}
	}
	
	getEventTypeHeaderButtons() {
		return [
			<IconButton
				tooltip={"Delete event type \"" + this.props.eventType.Name + "\""}
				key="delete-button"
				onTouchTap={() => {
					this.confirmationMessage.handleOpen();}}
				className={css(AppStyles.marginRightBig)}>
				<IconDelete/>
			</IconButton>];
	}

    showEntityMappings(entityMappings, attributes) {
		return (<Card
			expanded={this.state.mappingExpanded}
			onExpandChange={this.handleMappingsExpandChange}>
			<CardHeader
				title="Entity Mappings"
				actAsExpander={true}
				showExpandableButton={true}/>
			<CardText expandable={true}>
				<List>
                    {entityMappings.length === 0 &&
					<div> There are no event entity mappings yet. </div>}
                    {entityMappings.map((mapping) => {
                        return (
							<EntityMappingListItem
								key={mapping.Id}
								mapping={mapping}
								deleteMapping={this.props.deleteMapping}
								eventType={this.props.eventType}
								eventTypeAttributes={attributes}/>
                        );
                    })}
				</List>
			</CardText>
			<CardActions>
				<IconButton
					href={Utils.getLink('/settings/entityMapping/create')}
					tooltip={<span>create new event entity mapping</span>}>
					<IconAdd/>
				</IconButton>
			</CardActions>
		</Card>);
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
					{config.messages.deleteEventTypeMessage}
				</ConfirmationMessage>
				<Card
					expanded={this.state.expanded}
					onExpandChange={this.handleExpandChange}>
					<CardHeader
						title={this.props.eventType.Name}
						subtitle={`${config.descriptions.textNumberOfEvents} ${this.props.eventType.NumberOfEvents}`}
						actAsExpander={true}
						showExpandableButton={true}
						children={this.getEventTypeHeaderButtons()}
						className={css(AppStyles.dFlex, AppStyles.flexDirectionRow, AppStyles.justifyContentSpace)}/>
					<CardText
						expandable={true}>
						<Container fluid={true}>
							<Col md={4}>
								<List
									data-hint={help.display.settingsView.eventTypeAttributes}
									data-hintPosition="middle-middle">
									{attributes.map((attribute) => { return(
										<ListItem
											primaryText={attribute.Name}
											key={attribute.Id}
										/>);
									})}
								</List>
							</Col>
							<Col md={7}>
								<List
									data-hint={help.display.settingsView.eventTypeQueries}
									data-hintPosition="middle-middle">
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
							</Col>
							<Col md={1}>
								<IconButton
									tooltip={<span>create new event query</span>}
									href={Utils.getLink(`settings/eventType/${this.props.eventType.Id}/eventQuery/create`)} >
									<IconAdd/>
								</IconButton>
							</Col>
						</Container>
						<Container
							data-hint={help.display.settingsView.entityMappings}
							data-hintPosition="top-middle">
							{this.showEntityMappings(entityMappings, attributes)}
						</Container>
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
}))(EventType);