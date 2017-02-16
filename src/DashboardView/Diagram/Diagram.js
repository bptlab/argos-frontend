import React, { Component } from 'react';
import PieChart from './PieChart/PieChart.js';

class Diagram extends Component {
    constructor() {
        super();
        this.chartData = [];
        this.chartLabels = [];
    }

    fetchChartData(products) {
        for(let i = 0; i < products.length; i++) {
            const productState = products[i].state;
            if(this.chartLabels.indexOf(productState) > -1) {
                this.chartData[this.chartLabels.indexOf(productState)] += 1;
            } else {
                this.chartLabels.push(productState);
                this.chartData[this.chartLabels.indexOf(productState)] = 1;
            }
        }
    }

    render() {
        this.fetchChartData(this.props.products);
        return (
            <div className="container">
                <div className="diagram">
                    <div className="row">
                        <div className="col-xs-12 offset-sm-3 col-sm-6 offset-lg-4 col-lg-4 offset-uhd-5 col-uhd-2">
                            <PieChart
                                chartData={this.chartData}
                                chartLabels={this.chartLabels}
                                onStateExcludeInput={this.props.onStateExcludeInput}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Diagram;
