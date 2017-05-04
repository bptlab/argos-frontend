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

	componentDidMount() {
		this.updateEntityTypes();
		this.setState({
			highlitedEntityTypes: this.getHighlitedEntityTypes(this.props.currentEntityTypeId)
		});

	}

	updateEntityTypes() {
		this.props.hierarchy.forEach((hierarchyLayer) => {
			this.entityTypes = this.entityTypes.concat(hierarchyLayer);
		})
	}

	getEntityType(EntityTypeId) {
		return (this.entityTypes.find((entityType) => {
			return (entityType.Id === EntityTypeId);
		}));
	}

	getHighlitedEntityTypes(currentEntityTypeId) {
		const currentEntityType = this.getEntityType(currentEntityTypeId);

		if (currentEntityTypeId === -1) {
			return [];
		}
		else if (currentEntityType.ParentId === -1) {
			return [currentEntityType];
		}
		else {
			const parentEntityType = this.getEntityType(currentEntityType.ParentId);
			return this.getHighlitedEntityTypes(parentEntityType.Id).concat([currentEntityType]);
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