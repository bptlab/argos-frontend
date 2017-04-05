import React, { Component } from 'react';
import PredictionView from './PredictionView/PredictionView.js';

class PredictionList extends Component {
    
    generateErrorList() {
        const errorList = [];
        if(!this.props.showAllConfigurations && this.props.configuration && this.props.configuration.errorTypes) {
            this.props.configuration.errorTypes.forEach((errorType, index) => {
                errorList.push(
                    <PredictionView
                        key={index}
                        errorType={errorType} />
                );
            });
        }
        return errorList;
    }
    
    render() {
        const errorList = this.generateErrorList();
        return (
            <div className="prediction-list-container">
                {!this.props.showAllConfigurations && errorList.length > 0 && (
                    <div>
                        <h2 className="w-100">Possible product errors</h2>
                        <ul className="list-group">
                            {errorList}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
} export default PredictionList; 