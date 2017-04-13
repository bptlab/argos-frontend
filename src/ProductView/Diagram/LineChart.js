import React, { Component } from 'react';
import Chart from "chart.js";
import {argosConfig} from '../../config/argosConfig.js';

class LineChart extends Component {
    
    constructor(props) {
        super(props);
        this.buildChart = this.buildChart.bind(this);
    }

    static sortEventsByTime(elementA, elementB, timeStampAttribute) {
        const dateA = new Date(elementA[timeStampAttribute]);
        const dateB = new Date(elementB[timeStampAttribute]);
        return dateA - dateB;
    }

    componentDidMount() {
        this.getDiagramColors();
        this.buildChart();
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

    getDiagramColors() {
        const state = this.props.product.state.toLowerCase();
        switch(state) {
            case argosConfig.runningStateName:
                this.backgroundColor = argosConfig.runningStateTransparentColor;
                this.borderColor = argosConfig.runningStateColor;
                break;
            case argosConfig.warningStateName:
                this.backgroundColor = argosConfig.warningStateTransparentColor;
                this.borderColor = argosConfig.warningStateColor;
                break;
            case argosConfig.errorStateName:
                this.backgroundColor = argosConfig.errorStateTransparentColor;
                this.borderColor = argosConfig.errorStateColor;
                break;
            default:
                this.backgroundColor = argosConfig.undefinedStateTransparentColor;
                this.borderColor = argosConfig.undefinedStateColor;
        }
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
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            pointBorderWidth: 5,
            pointHoverRadius: 8,
            pointRadius: 1,
            pointHitRadius: 10,
            data: dataContainer
        });
    }
    
    buildChart() {
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

    componentDidUpdate() {
       this.buildChart();
    }
    
    render() {
        return (
            <div className="line-chart">
                <canvas ref="canvas" id="lineChart" height="160"/>
            </div>
        );
    }
} export default LineChart;