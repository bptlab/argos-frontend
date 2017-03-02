import React, { Component } from 'react';
import Chart from "chart.js";
import {argosConfig} from '../../../config/argosConfig.js';

const stateColor = {
    ERROR: "#D33F49",
    WARNING: "#EF9D6E",
    RUNNING: "#9FAB61",
};

class PieChart extends Component {
    getDisplayDataOf(chartData) {
        const displayData = [];
        const chartValueSum = chartData.reduce((pv, cv) => pv + cv, 0);
        chartData.forEach(function (item, index) {
            displayData.push(chartData[index] / chartValueSum);
        });
        return displayData;
    }

    getColors(chartLabels) {
        const backgroundColors = [];
        chartLabels.forEach(function (item) {
            backgroundColors.push(stateColor[item]);
        });
        return backgroundColors;
    }

    componentDidMount() {
        const charWrapper = this.refs.canvas;
        if(charWrapper) {
            const that = this;
            const chartContext = charWrapper.getContext('2d');
            const chart = new Chart(chartContext, {
                type: argosConfig.kindOfChart,
                data: {
                    labels: this.props.chartLabels,
                    datasets: [{
                        data: this.getDisplayDataOf(this.props.chartData),
                        backgroundColor: this.getColors(this.props.chartLabels)
                    }]
                },
                options: {
                    responsive: true,
                    legend: {
                        onClick: function (event, legendItem) {
                            //call funtion to remove cards with corresponding state from grid
                            that.props.onStateExcludeInput(legendItem.text);
                            //hide clicked legendCategory
                            const index = legendItem.index;
                            const lChart = this.chart;
                            const dataSetLength = (lChart.data.datasets || []).length;
                            for (let i = 0; i < dataSetLength; ++i) {
                                const meta = lChart.getDatasetMeta(i);
                                meta.data[index].hidden = !meta.data[index].hidden;
                            }
                            lChart.update();
                        }
                    }
                }
            });            
            this.state = {
                chart: chart
            };
        }
    }

    componentWillUnmount() {
        this.state.chart.destroy();
    }

    render() {
        return (
            <canvas ref="canvas" id="pieChart"/>
        );
    }
}

export default PieChart;
