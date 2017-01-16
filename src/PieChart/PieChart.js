import React, { Component } from 'react';
import './PieChart.css';
import Chart from "chart.js"
import ReactDOM from 'react-dom'


class PieChart extends Component {

    componentDidMount() {
        let charWrapper = ReactDOM.findDOMNode(this);
        let chartContext = charWrapper.getContext("2d");
        let chartData = [];
        let chartLabel = [];
        let chartValueSum = this.props.chartData.reduce((pv, cv) => pv+cv, 0);
        console.log(chartValueSum);
        let that = this;
        this.props.chartLabels.forEach(function (item, index) {
            chartData.push(that.props.chartData[index]/chartValueSum);
            chartLabel.push(item);
        });


        let chart = new Chart(chartContext, {
            type: 'doughnut',
            options: {
                responsive: true,
            },
            data: {
                labels: chartLabel,
                datasets: [
                    {
                        data: chartData,
                        backgroundColor: [
                            "#7CB342",
                            "#FFB300",
                            "#F4511E"
                        ],
                        hoverBackgroundColor: [
                            "#689F38",
                            "#FFA000",
                            "#E64A19"
                        ]
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
