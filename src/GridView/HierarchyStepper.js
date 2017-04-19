import React, { Component } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/communication/call-split';


class HierarchyStepper extends Component {
	render() {
		return (
			<div>
				<Stepper activeStep={3} connector={<ArrowForwardIcon className="rotate-90" />}>
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
			</div>
		);
	}
}

export default HierarchyStepper;