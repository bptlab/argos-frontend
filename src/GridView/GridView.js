import React, {Component} from 'react';
import {connect, PromiseState} from 'react-refetch';
import LoadingAnimation from './../Utils/LoadingAnimation';
import ErrorMessage from './../Utils/ErrorMessage';
import DonutChart from './DonutChart';
import HierarchyStepper from './HierarchyStepper';
import SearchBar from './../Utils/SearchBar';
import CardGrid from './CardGrid';


class GridView extends Component {
	
	render() {
		const { hierarchy, entity } = this.props;
		const allFetches = PromiseState.all([hierarchy, entity]);
		if (allFetches.pending) {
			return <LoadingAnimation/>;
		} else if (allFetches.rejected) {
			return <ErrorMessage message={allFetches.reason}/>;
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
