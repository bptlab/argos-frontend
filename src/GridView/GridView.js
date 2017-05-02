import {connect, PromiseState} from 'react-refetch';
import React from 'react';
import DonutChart from './DonutChart';
import HierarchyStepper from './HierarchyStepper';
import SearchBar from './../Utils/SearchBar';
import CardGrid from './CardGrid';
import ConnectionComponent from './../Utils/ConnectionComponent.js';


class GridView extends ConnectionComponent {
	
	getChildEntityTypes(parentEntityTypeId, hierarchy) {
		let childEntities  = [];
		hierarchy.forEach(hierarchyLayer => {
			childEntities = childEntities.concat(hierarchyLayer.filter( (entityType) => {
				return entityType.ParentId === parentEntityTypeId;
			}));
		});
	}
	
	render() {
		const { hierarchy, entity } = this.props;
		const allFetches = PromiseState.all([hierarchy, entity]);
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
						<div>
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

export default connect(props => ({
	hierarchy: `/entityType/hierarchy`,
	entity: `/entity/${props.match.params.entityId}`
}))(GridView);
