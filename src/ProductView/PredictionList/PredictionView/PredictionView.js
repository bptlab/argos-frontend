import React, { Component } from 'react';
import Modal from './../../../Utils/Modal/Modal.js';

class PredictionView extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        $('#prediction-view-'+this.props.errorType.errorTypeId+'-modal').modal('hide');
    }

    render() {
        const modalId = "#prediction-view-"+this.props.errorType.errorTypeId+"-modal";
        return (<a  className="prediction-view"
                    data-target={modalId}
                    data-toggle="modal">
                    <li
                        className="list-group-item justify-content-between list-group-item-action">
                        {this.props.errorType.errorTypeId} - {this.props.errorType.errorDescription}
                        <span className="badge badge-default badge-pill">
                                {this.props.errorType.errorCauses.length}
                        </span>
                        <Modal title={`Prediction Detail View ${this.props.errorType.errorDescription}`}
                               onSubmit={this.handleSubmit}
                               id={`prediction-view-${this.props.errorType.errorTypeId}`}
                               buttonText="Close">
                            <h2>{this.props.errorType.errorTypeId} - {this.props.errorType.errorDescription}</h2>
                        </Modal>
                    </li>
                </a>
        );
    }
} export default PredictionView;
