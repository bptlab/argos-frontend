import React, { Component } from 'react';
import Modal from './../../../Utils/Modal/Modal.js';
import Chart from "chart.js";

class PredictionView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
    }
    
    getChartData() {
        const labels = [];
        const predictedValue = [];
        const actualValue = [];
        this.props.errorType.errorCauses.forEach(function(errorCause) {
            labels.push(errorCause.causeDescription);
            predictedValue.push(errorCause.errorPrediction);
            actualValue.push(errorCause.errorOccurrences / this.props.errorType.errorOccurrences);
        }.bind(this));
        return ({
            labels: labels,
            datasets: [{
                label: 'Predicted Value',
                backgroundColor: "rgba(159, 171, 97, 0.5)",
                data: predictedValue,
            }, {
                label: 'Actual Value',
                backgroundColor: "rgba(0, 78, 100, 0.5)",
                data: actualValue,
            }]
        });
    }
    
    onOpenModal() {
        this.setState({isVisible: true});
    }

    handleSubmit() {
        $('#prediction-view-'+this.props.errorType.errorTypeId+'-modal').modal('hide');
    }
    
    componentDidUpdate() {
        const charWrapper = this.refs.predictionChart;
        if (charWrapper) {
            const chartContext = charWrapper.getContext('2d');
            const chartConfig = {
                type: 'bar',
                data: this.getChartData(),
                options: {
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                max: 1,
                                min: 0,
                                stepSize: 0.1
                            }
                        }]
                    }
                }
            };
            this.chart = new Chart(chartContext, chartConfig);
        }
    }

    render() {
        const errorTypeId = this.props.errorType.errorTypeId;
        const modalId = "#prediction-view-"+errorTypeId+"-modal";
        return (<a  className="prediction-view"
                    data-target={modalId}
                    data-toggle="modal" onClick={this.onOpenModal}>
                    <li
                        className="list-group-item justify-content-between list-group-item-action">
                        {errorTypeId} - {this.props.errorType.errorDescription}
                        <div className="prediction-view">
                            <Modal title={`Prediction Details: ${this.props.errorType.errorDescription}`}
                                   onSubmit={this.handleSubmit}
                                   id={`prediction-view-${errorTypeId}`}
                                   buttonText="Close">
                                <h2>{errorTypeId}</h2>
                                {this.state.isVisible &&
                                    <div className="line-chart container">
                                        <canvas ref="predictionChart" id="predictionChart" />
                                    </div>
                                }
                            </Modal>
                        </div>
                        <span className="badge badge-default badge-pill">
                                {this.props.errorType.errorCauses.length}
                        </span>
                    </li>
                </a>
        );
    }
} export default PredictionView;
