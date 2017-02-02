import React, { Component } from 'react';
import './Diagram.css';
import PieChart from './PieChart/PieChart.js'

class Diagram extends Component {

    constructor() {
        super();
        this.chartData = [];
        this.chartLabels = [];
    }


    fetchChartData() {
        for(let i = 0; i < this.props.products.length; i++) {
            const productState = this.props.products[i].state;
            if(this.chartLabels.indexOf(productState) > -1) {
                this.chartData[this.chartLabels.indexOf(productState)] += 1;
            } else {
                this.chartLabels.push(productState);
                this.chartData[this.chartLabels.indexOf(productState)] = 1;
            }
        }
    }

    render() {
        this.fetchChartData();
        return (
            <div className="DiagramWrapper container">
                <div className="innerDiagramWrapper">
                    <PieChart chartData={this.chartData} chartLabels={this.chartLabels} />
                </div>
            </div>
        );
    }
}

export default Diagram;
