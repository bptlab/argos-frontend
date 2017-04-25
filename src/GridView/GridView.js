import React, {Component} from 'react';
import DonutChart from './DonutChart';
import HierarchyStepper from './HierarchyStepper';
import SearchBar from './../Utils/SearchBar';
import CardGrid from './CardGrid';
import {connect, PromiseState} from 'react-refetch';

class GridView extends Component {
	
	render() {
		const { hierarchy, entity } = this.props;
		const allFetches = PromiseState.all([hierarchy, entity]);
		if (allFetches.pending) {
			return <LoadingAnimation/>;
		} else if (allFetches.rejected) {
			return <ErrorMessage error={allFetches.reason}/>;
		} else if (allFetches.fulfilled) {
			return (
				<div>
					<h1>{entity.Name}</h1>
					<HierarchyStepper
						hierarchy={hierarchy}
						currentEntityType={entity.TypeId}/>
					<DonutChart/>
					<SearchBar/>
					<CardGrid currentEntityId={this.props.match.params.entityId}/>
				</div>
			);
		}
	}
}

export default connect(props => ({
	hierarchy: `/entityType/hierarchy`,
	entity: `/entity/${props.match.params.entityId}`
}))(GridView);
