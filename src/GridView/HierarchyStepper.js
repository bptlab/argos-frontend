import React, { Component } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';


class HierarchyStepper extends Component {
	render() {
		return (
			<Stepper activeStep={3}>
				<Step>
					<StepLabel>Productfamilies</StepLabel>
				</Step>
				<Step>
					<StepLabel>Products</StepLabel>
				</Step>
				<Step>
					<StepLabel>Configurations</StepLabel>
					<StepLabel completed={false}>Parts</StepLabel>
				</Step>
			</Stepper>
		);
	}
}

export default HierarchyStepper;