import React, { Component } from 'react';

class StatusDerivation extends Component {
    render() {
        return (
            <div>
                <h2 className="area-title">Statusherleitung</h2>
                <div className="row">
                    <p className="col-4">Status:</p>
                    <p className="col">{this.props.product.state}</p>
                </div>
                <div className="row">
                    <p className="col-4">Statusbeschreibung:</p>
                    <p className="col">{this.props.product.stateDescription}</p>
                </div>
            </div>
        );
    }
}

export default StatusDerivation;