import React, { Component } from 'react';
import Chart from "chart.js";
import {argosConfig} from '../../config/argosConfig.js';

class LineChart extends Component {
    
    buildChartData() {
        const events = this.props.events;
        const dataContainer = [];
        const timeStampAttribute = "DateOfServiceIntervention";
        let counter = 0;
        events.sort(function(a, b) {
            const datePartsA = a[timeStampAttribute].split("-");
            const datePartsB = b[timeStampAttribute].split("-");
            const dateA = new Date(datePartsA[0], datePartsA[1], datePartsA[2]);
            const dateB = new Date(datePartsB[0], datePartsB[1], datePartsB[2]);
            return dateA - dateB;
        });
        events.forEach(function (event) {
            counter = counter + 1;
            dataContainer.push({
                x: event[timeStampAttribute],
                y: counter
            });
        });
        console.log(dataContainer);
        return dataContainer;
    }

    componentDidUpdate() {
        if(this.props.eventType.name) {
            const charWrapper = this.refs.canvas;
            if (charWrapper) {
                const chartContext = charWrapper.getContext('2d');
                const chart = new Chart(chartContext, {
                    type: argosConfig.kindOfDetailChart,
                    data: {
                        datasets: [{
                            label: this.props.eventType.name,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.buildChartData(),
                            spanGaps: false,
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            xAxes: [{
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        quarter: 'YYYY-MM-DD'
                                    }
                                }
                            }]
                        }
                    }
                });
                this.state = {
                    chart: chart
                };
            }
        }
    }
    
    render(){
        return (
            <div className="line-chart container">
                <canvas ref="canvas" id="pieChart"/>
            </div>
        );
    }
} export default LineChart;