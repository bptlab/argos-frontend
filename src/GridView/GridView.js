import React, {Component} from 'react';
import {connect, PromiseState} from 'react-refetch';
import LoadingAnimation from './../Utils/LoadingAnimation';
import ErrorMessage from './../Utils/ErrorMessage';
import DonutChart from './DonutChart';
import HierarchyStepper from './HierarchyStepper';
import SearchBar from './../Utils/SearchBar';
import CardGrid from './CardGrid';


class GridView extends Component {
	
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
		if (allFetches.pending) {
			return <LoadingAnimation/>;
		} else if (allFetches.rejected) {
			return <ErrorMessage message={allFetches.reason.message}/>;
		} else if (allFetches.fulfilled) {
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
}

export default connect(props => ({
	hierarchy: `/entityType/hierarchy`,
	entity: `/entity/${props.match.params.entityId}`
}))(GridView);
