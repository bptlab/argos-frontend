import React from "react";
import {Step, StepLabel, Stepper} from "material-ui/Stepper";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import config from "./../config/config";
import help from "./../config/help";
import './HierarchyStepper.css';

class HierarchyStepper extends ConnectionComponent {
	constructor() {
		super();
		this.state = {
			activeStep: 0,
			hierarchy: [],
		};
		this.fetchParentEntity = this.fetchParentEntity.bind(this);
	}

	componentDidMount() {
		this.setState({
			hierarchy: [this.props.getChildEntityTypes(this.props.currentEntity.TypeId, this.props.hierarchy)]
		}, () => {this.fetchParentEntity(this.props.currentEntity)});
	}

	fetchParentEntity(entity) {
		if (entity.Id !== -1) {
			this.setState({
				activeStep: this.state.activeStep + 1,
				hierarchy: [[entity]].concat(this.state.hierarchy),
			});
		}
		if (entity.ParentId !== -1) {
			const entityFetch = {
				entityId: entity.ParentId,
				successCallback: this.fetchParentEntity,
			};
			this.props.lazyEntityFetch(entityFetch);
		}
	}

	displayStepLabel(hierarchyLayerInstance, key) {
		if (hierarchyLayerInstance.TypeId >= 0) {
			const entityType = this.props.getEntityType(hierarchyLayerInstance, this.props.hierarchy);
			return(
				<StepLabel key={key}>
					<a href={`/grid/${hierarchyLayerInstance.Id}`}>
						{entityType.Name}: {hierarchyLayerInstance.Name}
					</a>
				</StepLabel>
			);
		}
		else {
			return(
				<StepLabel key={key}>
					{hierarchyLayerInstance.Name}
				</StepLabel>
			);
		}
	}

	render() {
		return (
			<div
				data-hint={help.display.hierarchyStepper}
				data-hintPosition="bottom-middle">
				<Stepper
					activeStep={this.state.activeStep}
					className="elementMarginTop">

					{this.state.hierarchy.map((hierarchyLayer, index) => {
						return (
						    <Step key={index} className="hierarchy-step">
								{hierarchyLayer.map((hierarchyLayerInstance, index) => {
									return this.displayStepLabel(hierarchyLayerInstance, index);
								})}
							</Step>
						);
					})}
				</Stepper>
			</div>
		);
	}
}


export default ConnectionComponent.argosConnector({fetch: ConnectionComponent.switchFetch})(() => ({
	lazyEntityFetch: entityFetch => ({
		entity: {
			url: config.backendRESTRoute + `/entity/${entityFetch.entityId}`,
			then: (entity) => {entityFetch.successCallback(entity)},
		},
	})
}))(HierarchyStepper);