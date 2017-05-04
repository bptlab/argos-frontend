import React, { Component } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';


class HierarchyStepper extends Component {
	constructor() {
		super();
		this.entityTypes = [];
		this.state = {
			highlitedEntityTypes: []
		}
	}

	displayStepLabel(entityType, index) {
		if(this.state.highlitedEntityTypes.includes(entityType)) {
			return (<StepLabel key={index} completed={true}>{entityType.Name}</StepLabel>);
		}
		else {
			return (<StepLabel key={index}>{entityType.Name}</StepLabel>);
		}
	}

	render() {
		return (
			<Stepper>
				{this.props.hierarchy.map((hierarchyLayer, index) => {
					return (
						<Step key={index}>
							{hierarchyLayer.map((entityType, index) => {
								return this.displayStepLabel(entityType, index);
							})}
						</Step>
					);
				})}
			</Stepper>
		);
	}
}

export default HierarchyStepper;