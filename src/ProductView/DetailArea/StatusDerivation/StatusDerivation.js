import React, { Component } from 'react';

class StatusDerivation extends Component {
    render() {
        return (
            <div className="status-derivation">
                <h2 className="area-title">Status derivation</h2>
                <div className="row">
                    <p className="col-4">Status:</p>
                    <p className="col">{this.props.configuration.state}</p>
                </div>
                <div className="row">
                    <p className="col-4">Status description:</p>
                    <p className="col">{this.props.configuration.stateDescription}</p>
                </div>
            </div>
        );
    }
}

export default StatusDerivation;
