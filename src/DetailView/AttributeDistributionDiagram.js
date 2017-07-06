import React, { Component } from 'react';
import config from "../config/config";
import "./../App.css";
const plotly = require('plotly.js');

class AttributeDistributionDiagram extends Component {

	constructor(props) {
		super(props);
		this.diagramId = "attributeDistributionDiagram";
	}

	componentWillReceiveProps(props) {
		AttributeDistributionDiagram.buildChartDataset(props);
	}

	componentDidMount() {
		AttributeDistributionDiagram.buildChartDataset(this.props);
	}

	static getDiagramLayout() {
		return {
			xaxis: {
				showgrid: false,
				type: 'category'
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

					<div
						id={this.diagramId}
						className={this.props.className}
					/>
		);
	}
}

export default AttributeDistributionDiagram;