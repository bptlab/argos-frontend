import React, { Component } from 'react';
import PredictionView from './PredictionView/PredictionView.js';

class PredictionList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const errorList = []; 
        if(this.props.configuration && this.props.configuration.errorTypes) {
            this.props.configuration.errorTypes.forEach((errorType, index) => {
                errorList.push(
                    <PredictionView
                        key={index}
                        errorType={errorType} />
                );
            });
        }
        return (
            <div className="container prediction-list-container">
                <h2>Possible product errors</h2>
                <ul className="list-group">
                    {errorList}
                </ul>
            </div>
        );
    }
} export default PredictionList; 