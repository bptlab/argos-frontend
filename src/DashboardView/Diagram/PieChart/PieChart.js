import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Chart from "chart.js";

const stateColor = {
    ERROR: "#D33F49",
    WARNING: "#EF9D6E",
    RUNNING: "#9FAB61",
};

class PieChart extends Component {
    getData() {
        const chartData = [];
        const that = this; //make this in context of anonyme function. available
        const chartValueSum = this.props.chartData.reduce((pv, cv) => pv + cv, 0);
        this.props.chartData.forEach(function (item, index) {
            chartData.push(that.props.chartData[index] / chartValueSum);
        });
        return chartData;
    }

    getColors() {
        const backgroundColors = [];
        this.props.chartLabels.forEach(function (item) {
            backgroundColors.push(stateColor[item]);
        });
        return backgroundColors;
    }

    componentDidMount() {
        const charWrapper = ReactDOM.findDOMNode(this);
        const chartContext = charWrapper.getContext("2d");
        const chart = new Chart(chartContext, {
            type: 'doughnut',
            options: {
                responsive: true
            },
            data: {
                labels: this.props.chartLabels,
                datasets: [{
                    data: this.getData(),
                    backgroundColor: this.getColors()
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
            <canvas id="pieChart"/>
        );
    }
}

export default PieChart;
