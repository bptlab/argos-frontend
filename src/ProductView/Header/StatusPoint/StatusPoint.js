import React, { Component } from 'react';
import './StatusPoint.css';

class StatusPoint extends Component {
    render() {
        return (
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" fill="#111111" />
            </svg>
        );
    }
}

export default StatusPoint;
