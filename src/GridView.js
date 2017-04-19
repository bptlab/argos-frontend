import React, { Component } from 'react';
import HierarchyStepper from './HierarchyStepper'
import CardGrid from './CardGrid';

class GridView extends Component {
	render() {
		return (
			<div>
				<HierarchyStepper/>
				<div className="container">
					<CardGrid/>
				</div>
			</div>
		);
	}
}

export default GridView;
