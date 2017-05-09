import React, { Component } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import {connect, PromiseState} from "react-refetch";
import ConnectionComponent from "./../Utils/ConnectionComponent.js";
import { css } from 'aphrodite';
import AppStyles from "./../AppStyles";
import config from "./../config/config";


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
            return(
				<StepLabel key={key}>
                    {this.props.getEntityType(hierarchyLayerInstance, this.props.hierarchy).Name}: {hierarchyLayerInstance.Name}
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
			<Stepper
				activeStep={this.state.activeStep}
				className={css(this.props.styles, AppStyles.elementMarginTop)}>

				{this.state.hierarchy.map((hierarchyLayer, index) => {
					return (
						<Step key={index}>
							{hierarchyLayer.map((entityType, index) => {return(
								this.displayStepLabel(entityType, index)
							);})}
						</Step>
					);
				})}
			</Stepper>
		)
	}
}


export default connect.defaults({fetch: ConnectionComponent.switchFetch})(props => ({
    lazyEntityFetch: entityFetch => ({
        entity: {
            url: config.backendRESTRoute + `/entity/${entityFetch.entityId}`,
            then: (entity) => {entityFetch.successCallback(entity)},
        },
    })
}))(HierarchyStepper);