import React from "react";
import {Container} from "react-grid-system";
import DonutChart from "./DonutChart";
import HierarchyStepper from "./HierarchyStepper";
import SearchBar from "./../Utils/SearchBar";
import CardGrid from "./CardGrid";
import {connect, PromiseState} from "react-refetch";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import AppStyles from "./../AppStyles";
import config from './../config/config.js';
import Header from "../Header";

class GridView extends ConnectionComponent {
	constructor() {
		super();
		this.getChildEntityTypes = this.getChildEntityTypes.bind(this);
		this.getEntityType = this.getEntityType.bind(this);
	}

	getEntityType(entity, hierarchy) {
		const entityTypes = hierarchy.find(hierarchyArray => {
			return hierarchyArray.find(entityType => {
				return entityType.Id === entity.TypeId;
			});
		});
		if (entityTypes) {
			return entityTypes[0];
		}
	}

	getChildEntityTypes(parentEntityTypeId, hierarchy) {
		let childEntities  = [];
		window.hierarchy.forEach(hierarchyLayer => {
			childEntities = childEntities.concat(hierarchyLayer.filter( (entityType) => {
				return entityType.ParentId === parentEntityTypeId;
			}));
		});
		return childEntities;
	}

	getPageTitle(entity, hierarchy) {
		const entityType = this.getEntityType(entity, hierarchy);
		if (entityType) {
			return entityType.Name + ": " + entity.Name;
		}
		return "Home";
	}

	render() {
		const allFetches = PromiseState.all([this.props.entity]);
		const entity = this.props.entity.value;
		const connectionIncomplete = super.render(allFetches);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		const childEntityTypes = this.getChildEntityTypes(entity.TypeId, window.hierarchy);
		return (
			<div>
				<Header title={this.getPageTitle(entity, window.hierarchy)} status={entity.Status} />
				<Container>
					<HierarchyStepper
						hierarchy={hierarchy}
						currentEntity={entity}
						getEntityType={this.getEntityType}
						getChildEntityTypes={this.getChildEntityTypes}/>
					<SearchBar/>
					{childEntityTypes.map((childEntityType) => {
						return(
							<div key={`div-${childEntityType.Id}`}>
								<h1>{childEntityType.Name}</h1>
								<DonutChart styles={[AppStyles.elementMarginTop]} />
								<CardGrid
									styles={[AppStyles.elementMarginTop]}
									key={childEntityType.Id}
									currentEntity={entity}
									entityType={childEntityType} />
							</div>
						);
					})}
				</Container>
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	entity: config.backendRESTRoute + `/entity/${props.match.params.entityId}`
}))(GridView);

class GridView extends ConnectionComponent {

	var
	
	getChildEntityTypes(parentEntityTypeId) {
		let childEntities  = [];
		window.hierarchy.forEach(hierarchyLayer => {
			childEntities = childEntities.concat(hierarchyLayer.filter( (entityType) => {
				return entityType.ParentId === parentEntityTypeId;
			}));
		});
		return childEntities;
	}

	getPageTitle(entity) {
		const entityTypeInformation = window.hierarchy.find(hierarchyArray => {
			return hierarchyArray.find(entityType => {
				return entityType.Id === entity.TypeId;
			});
		});
		if (entityTypeInformation) {
			return entityTypeInformation[0].Name + ": " + entity.Name;
		}
		return "Home";
	}

	render() {
		const allFetches = PromiseState.all([this.props.entity]);
		const entity = this.props.entity.value;
		const connectionIncomplete = super.render(allFetches);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		const childEntityTypes = this.getChildEntityTypes(entity.TypeId, window.hierarchy);
		return (
			<div>
				<Header title={this.getPageTitle(entity, window.hierarchy)} status={entity.Status} />
				<Container>
				<HierarchyStepper
					hierarchy={window.hierarchy}
					currentEntityTypeId={entity.TypeId}/>
				<SearchBar/>
				{childEntityTypes.map((childEntityType) => {
					return(
						<div key={`div-${childEntityType.Id}`}>
							<h1>{childEntityType.Name}</h1>
							<DonutChart styles={[AppStyles.elementMarginTop]} />
							<CardGrid
								styles={[AppStyles.elementMarginTop]}
								key={childEntityType.Id}
								currentEntity={entity}
								entityType={childEntityType} />
						</div>
					);
				})}
				</Container>
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	entity: config.backendRESTRoute + `/entity/${props.match.params.entityId}`
}))(GridView);
