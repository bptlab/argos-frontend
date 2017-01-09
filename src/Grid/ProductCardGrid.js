import React, { Component } from 'react';
import './ProductCardGrid.css';

class Grid extends Component {
    render() {
        return (
            <div className="ProductCardGrid">
                {this.props.children}
            </div>
        );
    }
}

export default Grid;
