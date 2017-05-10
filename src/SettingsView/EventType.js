import React from 'react';
import {Card, CardHeader, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import EventQueryListItem from  './EventQueryListItem.js';
import EntityMappingListItem from  './EntityMappingListItem.js';
import config from './../config/config.js';
import { Col, Container } from 'react-grid-system';
import {PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';
import ErrorMessage from './../Utils/ErrorMessage.js';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';

class EventType extends ConnectionComponent {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		};
		this.handleExpandChange = this.handleExpandChange.bind(this);
		this.handleEventTypeDeletion = this.handleEventTypeDeletion.bind(this);
	}

	handleExpandChange(expanded) {
		this.setState({expanded: expanded});
	}
	
	handleEventTypeDeletion() {
		this.props.deleteEventType(this.props.eventType);
	}

	getEventTypeHeaderButtons() {
		return [
			<IconButton><IconEdit/></IconButton>,
			<IconButton><IconDelete/></IconButton>];
	}

	getEntityTypeName(id) {
		console.log("Obtaining entity name");
		let searchedEntity = undefined;
		window.hierarchy.forEach(function(layer) {
            layer.forEach(function (entity) {
                if (entity.Id === id) {
                    searchedEntity = entity;
                }
            })
        });
		return searchedEntity.Name;
	}

	render() {
		const allFetches = PromiseState.all([this.props.entityMappingss, this.props.queries, this.props.attributes]);
        const optionalActions = this.props.deleteQueryeResponse;
        const queries = this.props.queries.value;
        const attributes = this.props.attributes.value;
        const entityMappings = this.props.entityMappingss.value;
        const connectionIncomplete = super.render(allFetches);
        if(connectionIncomplete) {
            return connectionIncomplete;
		}

		return (
			<div>
			{optionalActions && optionalActions.rejected &&
				<ErrorMessage message={optionalActions.reason} />
			}
				<Card
					expanded={this.state.expanded}
					onExpandChange={this.handleExpandChange}>
					<CardHeader
						title={this.props.eventType.Name}
						subtitle={`${config.descriptions.textNumberOfEvents} ${this.props.eventType.NumberOfEvents}`}
						actAsExpander={true}
						showExpandableButton={true}
						children={this.getEventTypeHeaderButtons()}
					/>
					<CardText
						expandable={true}>
						<Container fluid={true}>
							<Col md={4}>
								<List >
									{attributes.map((attribute) => { return(
										<ListItem
											primaryText={attribute.Name}
											key={attribute.Id}
										/>);
									})}
								</List>
							</Col>
							<Col md={7}>
								<List>
									{queries.map((query) => {
										return(
											<EventQueryListItem
												query={query}
												deleteQuery={this.props.deleteQuery}
												key={query.Id}/>);
										}
									)}
								</List>
							</Col>
							<Col md={1}>
								<IconButton href="settings/eventType/create"><IconAdd/></IconButton>
							</Col>
						</Container>
						<Container>
							<Card>
								<CardHeader
									title="EntityMappings"
									actAsExpander={true}
									showExpandableButton={true}/>
								<CardText>
									<List>
										{entityMappings.map((mapping) => {
											return (
												<EntityMappingListItem
													key={mapping.Id}
													mapping={mapping}
													eventType={this.props.eventType}
													getEntityTypeName={this.getEntityTypeName}/>
											)
										})}
									</List>
								</CardText>
							</Card>
						</Container>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default ConnectionComponent.argosConnector()(props => ({
	queries: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/queries`,
	attributes: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/attributes`,
    entityMappingss: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/entitymappings`,
	deleteQuery: query => ({
		deleteQueryeResponse: {
			url: config.backendRESTRoute + `/eventquery/${query.Id}/delete`,
			method: 'DELETE',
			body: "",
			andThen: () => ({
				queries: {
					url: config.backendRESTRoute + `/eventtype/${props.eventType.Id}/queries`,
					refreshing: true
				}
			})
		}
	})
}))(EventType);