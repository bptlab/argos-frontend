import React, { Component } from 'react';
import Chart from "chart.js";
import {argosConfig} from '../../config/argosConfig.js';

class LineChart extends Component {
    
    static sortEventsByTime(elementA, elementB, timeStampAttribute) {
        let datePartsA = elementA[timeStampAttribute].split("T")[0];
        let datePartsB = elementB[timeStampAttribute].split("T")[0];
        datePartsA = datePartsA.split("-");
        datePartsB = datePartsB.split("-");
        const dateA = new Date(datePartsA[0], datePartsA[1], datePartsA[2]);
        const dateB = new Date(datePartsB[0], datePartsB[1], datePartsB[2]);
        return dateA - dateB;
    }
    
    buildChartData() {
        const dataset = [];
        this.props.eventData.forEach((eventDataContainer) => {
            dataset.push(this.buildChartDataset(eventDataContainer.eventType, eventDataContainer.events));
        });
        return dataset;
    }
    buildChartDataset(eventType, events) {
        const dataContainer = [];
        const timeStampAttribute = eventType.timestampAttributeName;
        let counter = 0;
        const sortedEvents = events;
        sortedEvents.sort((elementA, elementB) => {
            return LineChart.sortEventsByTime(elementA, elementB, timeStampAttribute);
        });
        sortedEvents.forEach(function (event) {
            counter = counter + 1;
            dataContainer.push({
                x: event[timeStampAttribute].split("T")[0],
                y: counter
            });
        });
        return({
            label: eventType.name,
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(0, 78, 100, 0.5)",
            borderColor: "rgba(0, 78, 100, 1)",
            pointBorderWidth: 5,
            pointHoverRadius: 8,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataContainer
        });
            
    }

    componentDidMount() {
        const charWrapper = this.refs.canvas;
        if (charWrapper) {
            const chartContext = charWrapper.getContext('2d');
            const chart = new Chart(chartContext, {
                type: argosConfig.kindOfDetailChart,
                data: {
                    datasets: this.buildChartData()
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
    
    render() {
        return (
            <div className="line-chart container">
                <canvas ref="canvas" id="lineChart" height="80"/>
            </div>
        );
    }
} export default LineChart;