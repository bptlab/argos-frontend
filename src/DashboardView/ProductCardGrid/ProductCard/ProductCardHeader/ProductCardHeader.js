import React, { Component } from 'react';
import {CardTitle} from 'reactstrap';
import './ProductCardHeader.css';

class CardHeader extends Component {
    render() {
        return (
            <CardTitle className={ `ProductCardTitle ProductCardTitle_${this.props.category}` }>{this.props.children}</CardTitle>
        );
    }
}

export default CardHeader;