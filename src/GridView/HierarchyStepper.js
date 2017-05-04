import React, { Component } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { css } from 'aphrodite';
import AppStyles from "./../AppStyles";

class HierarchyStepper extends Component {
	constructor() {
		super();
		this.entityTypes = [];
		this.state = {
			activeStep: 0,
			highlitedEntityTypes: []
		}
	}

	componentDidMount() {
		this.updateEntityTypes();
		const highlitedEntityTypes = this.getHighlitedEntityTypes(this.props.currentEntityTypeId)
		this.setState({
			activeStep: highlitedEntityTypes.length,
			highlitedEntityTypes: highlitedEntityTypes
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
			return (
				<StepLabel
					key={index}
					completed={true}>
					{entityType.Name}
				</StepLabel>);
		}
		else {
			return (<StepLabel key={index}>{entityType.Name}</StepLabel>);
		}
	}

	render() {
		return (
			<Stepper
				activeStep={this.state.activeStep}
				className={css(this.props.styles, AppStyles.elementMarginTop)}>
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