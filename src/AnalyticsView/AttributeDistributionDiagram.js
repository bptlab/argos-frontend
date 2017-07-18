import React, { Component } from 'react';
import config from "../config/config";
import "../App.css";
const plotly = require('plotly.js');

class AttributeDistributionDiagram extends Component {

	constructor(props) {
		super(props);
		this.diagramId = "attributeDistributionDiagram";
		this.buildChartDataset = this.buildChartDataset.bind(this);
	}

	componentWillReceiveProps(props) {
		this.buildChartDataset(props);
	}

	componentDidMount() {
		this.buildChartDataset(this.props);
	}

	static getDiagramLayout() {
		return {
			xaxis: {
				showgrid: false,
				type: 'category',
			},
			yaxis: {
				tickformat: ',.0%',
				range: [0,1]
			},
			height: 400,
			margin: {pad: 10}
		};
	}

	static getTrace(x, y) {
		const columnDescription = [];
		y.forEach((y) => {
			columnDescription.push(y*100 + "%");
		});
		return [{
			x: x,
			y: y,
			type: 'bar',
			text: columnDescription,
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

	buildChartDataset(props) {
		const {attributeValues, numberOfOccurrences} = props;

		plotly.newPlot(
			this.diagramId,
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