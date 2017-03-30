import React, { Component } from 'react';

class PredictionList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const errorList = [];
        if(this.props.configuration && this.props.configuration.errorTypes) {
            this.props.configuration.errorTypes.forEach((errorType, index) => {
                errorList.push(
                    <li key={index} className="list-group-item justify-content-between list-group-item-action">
                        {errorType.errorTypeId} - {errorType.errorDescription}
                        <span className="badge badge-default badge-pill">
                            {errorType.errorCauses.length}
                        </span>
                    </li>
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