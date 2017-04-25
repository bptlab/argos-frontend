import React, { Component } from 'react';
import DonutChart from './DonutChart'
import HierarchyStepper from './HierarchyStepper'
import SearchBar from './../Utils/SearchBar'
import CardGrid from './CardGrid';

class GridView extends Component {


	componentDidMount() {
		this.props.datasource.getEntities(3, this.getEntities);
	}

	getEntities(entities) {
		this.setState({
			entities: entities
		});
	}

	render() {
		return (
			<div>
				<HierarchyStepper/>
				<DonutChart/>
				<SearchBar/>
				<CardGrid entities={this.props.entities}/>
			</div>
		);
	}
}

export default GridView;
