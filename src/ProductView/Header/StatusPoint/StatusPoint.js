import React, { Component } from 'react';
import './StatusPoint.css';

class StatusPoint extends Component {
    render() {
        return (
            <div className="status-point">
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="20" fill="#FFAA00" />
                </svg>
            </div>
        );
    }
}

export default StatusPoint;
