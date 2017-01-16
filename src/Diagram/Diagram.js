import React, { Component } from 'react';
import './Diagram.css';
import PieChart from '../PieChart/PieChart.js'

class Diagram extends Component {

    constructor() {
        super();
        this.chartData = [];
        this.chartLabels = [];
    }


    fetchChartData() {
        for(let index in this.props.products) {
            if(this.chartLabels.indexOf(this.props.products[index].state) > -1) {
                this.chartData[this.chartLabels.indexOf(this.props.products[index].state)] += 1;
            } else {
                this.chartLabels.push(this.props.products[index].state);
                this.chartData[this.chartLabels.indexOf(this.props.products[index].state)] = 1;
            }
        }
    }

    render() {
        this.fetchChartData();
        return (
            <div className="DiagramWrapper">
                <div className="innerDiagramWrapper">
                    <PieChart chartData={this.chartData} chartLabels={this.chartLabels} />
                </div>
            </div>
        );
    }
}

export default Diagram;
