import React, { Component } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';


class HierarchyStepper extends Component {
	render() {
		return (
			<div>
				<Stepper activeStep={0}>
					<Step>
						<StepLabel>Productfamilies</StepLabel>
					</Step>
					<Step>
						<StepLabel>Products</StepLabel>
					</Step>
					<Step>
						<StepLabel>Configurations</StepLabel>
						<StepLabel>Parts</StepLabel>
					</Step>
				</Stepper>
			</div>
		);
	}
}

export default HierarchyStepper;