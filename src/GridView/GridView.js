import React from "react";
import {Container} from "react-grid-system";
import DonutChart from "./DonutChart";
import HierarchyStepper from "./HierarchyStepper";
import SearchBar from "./../Utils/SearchBar";
import FilterBar from "./../Utils/FilterBar"
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
		this.handleFilterChange = this.handleFilterChange.bind(this);

		this.state = {
			filter: [],
		};
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
		hierarchy.forEach(hierarchyLayer => {
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

	handleFilterChange(filter) {
		this.setState({
			filter: filter,
		});
	}

	loadFilterBar() {
		return (
			<FilterBar
				styles={[AppStyles.elementMarginTop]}
				onFiltersChange={this.handleFilterChange}
				autoCompleteSource={[]}/>
		);
	}

	render() {
		const allFetches = PromiseState.all([this.props.hierarchy, this.props.entity]);
		const hierarchy = this.props.hierarchy.value;
		const entity = this.props.entity.value;
		const connectionIncomplete = super.render(allFetches);
		if(connectionIncomplete) {
			return connectionIncomplete;
		}
		const childEntityTypes = this.getChildEntityTypes(entity.TypeId, hierarchy);

		const filterBar = this.loadFilterBar();

		return (
			<div>
				<Header title={this.getPageTitle(entity, hierarchy)} status={entity.Status} />
				<Container>
					<HierarchyStepper
						hierarchy={hierarchy}
						currentEntity={entity}
						getEntityType={this.getEntityType}
						getChildEntityTypes={this.getChildEntityTypes}/>
					{filterBar}
					{childEntityTypes.map((childEntityType) => {
						return(
							<div key={`div-${childEntityType.Id}`}>
								<h1>{childEntityType.Name}</h1>
								<DonutChart styles={[AppStyles.elementMarginTop]} />
								<CardGrid
									filter={this.state.filter}
									styles={[AppStyles.elementMarginTop]}
									key={childEntityType.Id}
									currentEntity={entity}
									entityType={childEntityType}/>
							</div>
						);
					})}
				</Container>
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	hierarchy: config.backendRESTRoute + `/entitytype/hierarchy`,
	entity: config.backendRESTRoute + `/entity/${props.match.params.entityId}`
}))(GridView);
