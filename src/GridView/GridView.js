import React from 'react';
import DonutChart from './DonutChart';
import HierarchyStepper from './HierarchyStepper';
import SearchBar from './../Utils/SearchBar';
import CardGrid from './CardGrid';
import {connect, PromiseState} from 'react-refetch';
import ConnectionComponent from './../Utils/ConnectionComponent.js';

class GridView extends ConnectionComponent {
	
	getChildEntityTypes(parentEntityTypeId, hierarchy) {
		let childEntities  = [];
		hierarchy.forEach(hierarchyLayer => {
			childEntities = childEntities.concat(hierarchyLayer.filter( (entityType) => {
				return entityType.ParentId === parentEntityTypeId;
			}));
		});
		return childEntities;
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
		return (
			<div>
				<h1>{entity.Name}</h1>
				<HierarchyStepper
					hierarchy={hierarchy}
					currentEntityType={entity.TypeId}/>
				<SearchBar/>
				{childEntityTypes.map((childEntityType) => {
					return(
						<div key={`div-${childEntityType.Id}`}>
							<DonutChart/>
							<CardGrid
								key={childEntityType.Id}
								currentEntity={entity}
								entityType={childEntityType} />
						</div>
					);
				})}
			</div>
		);
	}
}

export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
	hierarchy: `/entityType/hierarchy`,
	entity: `/entity/${props.match.params.entityId}`
}))(GridView);
