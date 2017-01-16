import React, { Component } from 'react';
import './PieChart.css';
import Chart from "chart.js"
import ReactDOM from 'react-dom'

let stateColor = {
    ERROR: "#F4511E",
    WARNING: "#FFB300",
    RUNNING: "#7CB342",
};

class PieChart extends Component {

    getData() {
        let chartData = [];
        let that = this;
        let chartValueSum = this.props.chartData.reduce((pv, cv) => pv+cv, 0);
        this.props.chartData.forEach(function (item, index) {
            chartData.push(that.props.chartData[index]/chartValueSum);
        });
        return chartData;
    }

    getColors() {
        let backgroundColors = [];
        this.props.chartLabels.forEach(function (item) {
            backgroundColors.push(stateColor[item]);
        });
        return backgroundColors;
    }

    componentDidMount() {
        let charWrapper = ReactDOM.findDOMNode(this);
        let chartContext = charWrapper.getContext("2d");
        let chart = new Chart(chartContext, {
            type: 'doughnut',
            options: {
                responsive: true,
            },
            data: {
                labels: this.props.chartLabels,
                datasets: [
                    {
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
        let chartHeight = (window.innerHeight / 3);
        return (
            <canvas id="pieChart" height={chartHeight} width={chartHeight} />
        );
    }
}

export default PieChart;
