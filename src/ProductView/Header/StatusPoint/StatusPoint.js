import React, { Component } from 'react';

class StatusPoint extends Component {
    render() {
        return (
            <div className={ `status-point d-flex align-items-center ${this.props.product.state.toLowerCase()}` }>
                <svg width="40" height="40" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="21" className="status-point-shadow"/>
                    <circle cx="20" cy="20" r="20" className="status-point"/>
                </svg>
            </div>
        );
    }
}

export default StatusPoint;
