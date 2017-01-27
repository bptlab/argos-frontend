import React, { Component } from 'react';
import './StatusPoint.css';

class StatusPoint extends Component {
    render() {
        return (
            <div className={ `status-point d-flex align-items-center ${this.props.product.state.toLowerCase()}` }>
                <svg width="40" height="40" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="21" fill="rgba(0, 0, 0, 0.1)" />
                    <circle cx="20" cy="20" r="20" fill="#FFAA00" />
                </svg>
            </div>
        );
    }
}

export default StatusPoint;
