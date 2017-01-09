import React, { Component } from 'react';
import './ProductCardGrid.scss';

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
