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
		console.log([this.props.getChildEntityTypes(this.props.currentEntity.TypeId, this.props.hierarchy)]);
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

	render() {
		return (
			<Stepper
				activeStep={this.state.activeStep}
				className={css(this.props.styles, AppStyles.elementMarginTop)}>
				{this.state.hierarchy.map((hierarchyLayer, index) => {
					return (
						<Step key={index}>
							{hierarchyLayer.map((entityType, index) => {return(
								<StepLabel key={index}>
                                    {entityType.Name}
								</StepLabel>
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