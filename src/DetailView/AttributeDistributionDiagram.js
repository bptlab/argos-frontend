import React, { Component } from 'react';
import config from "../config/config";
import {Dialog, FlatButton} from "material-ui";
const plotly = require('plotly.js');

class AttributeDistributionDiagram extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isDiagramOpen: true
		};
		this.diagramId = "attributeDistributionDiagram";
		this.handleClose = this.handleClose.bind(this);
	}

	componentWillReceiveProps(props) {
		AttributeDistributionDiagram.buildChartDataset(props);
	}

	componentDidMount() {
		AttributeDistributionDiagram.buildChartDataset(this.props);
	}

	handleClose() {
		this.setState({
			isDiagramOpen: false
		});
	}

	static getDiagramLayout() {
		return {
			xaxis: {
				showgrid: false,
			},
			height: 400,
			margin: {pad: 10}
		};
	}

	static getTrace(x, y) {
		return [{
			x: x,
			y: y,
			type: 'bar',
			text: y,
			textposition: 'auto',
			hoverinfo: 'none',
			marker: {
				color: config.colors.accentLight,
				opacity: 0.6,
				line: {
					color: config.colors.accent,
					width: 1.5
				}
			}
		}];
	}

	static buildChartDataset(props) {
		const {attributeValues, numberOfOccurrences} = props;

		plotly.newPlot(
			'attributeDistributionDiagram',
			AttributeDistributionDiagram.getTrace(attributeValues, numberOfOccurrences),
			AttributeDistributionDiagram.getDiagramLayout(),
			{displayModeBar: false}
		);
	}

	render() {
		return (
			<Dialog
				title={config.descriptions.attributeDistributionDiagram}
				modal={false}
				open={this.state.isDiagramOpen}
				actions={[<FlatButton
					label="Close"
					primary={true}
					onTouchTap={this.handleClose}
				/>]}
				onRequestClose={this.handleClose}
				>
				<div
					id={this.diagramId}
					className={this.props.className}
				/>
			</Dialog>
		);
	}
}

export default AttributeDistributionDiagram;