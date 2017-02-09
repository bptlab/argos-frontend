import React, { Component } from 'react';
import Chart from "chart.js"
import './PieChart.css';

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

    componentDidUpdate() {
        const charWrapper = this.refs.canvas;
        const chartContext = charWrapper.getContext('2d');
        const chart = new Chart(chartContext, {
            type: 'doughnut',
            options: {
                responsive: true
            },
            data: {
                labels: this.props.chartLabels,
                datasets: [{
                    data: this.getDisplayDataOf(this.props.chartData),
                    backgroundColor: this.getColors(this.props.chartLabels)
                }]
            }
        });
        this.state = {
            chart: chart
        };
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
