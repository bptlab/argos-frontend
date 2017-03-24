import React, { Component } from 'react';
import Chart from "chart.js";
import {argosConfig} from '../../config/argosConfig.js';

class LineChart extends Component {

    static sortEventsByTime(elementA, elementB, timeStampAttribute) {
        const dateA = new Date(elementA[timeStampAttribute]);
        const dateB = new Date(elementB[timeStampAttribute]);
        return dateA - dateB;
    }
    
    buildChartData() {
        const dataset = [];
        const evenTypeDiagramData = this.buildChartDataset(this.props.eventType, this.props.events);
        dataset.push(evenTypeDiagramData);
        return dataset;
    }
    
    shouldComponentUpdate(nextProps) {
        return (nextProps.events.length !== this.props.events.length
        || nextProps.eventType.name !== this.props.eventType.name);
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

    componentDidUpdate() {
        const charWrapper = this.refs.canvas;
        if (charWrapper) {
            const chartContext = charWrapper.getContext('2d');
            const chartConfig = {
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
            };
            this.chart = new Chart(chartContext, chartConfig);
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