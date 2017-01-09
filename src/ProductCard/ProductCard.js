import React, { Component } from 'react';
import {Card} from 'reactstrap';
import './ProductCard.css';
import ProductCardHeader from './ProductCardHeader.js';

class ProductCard extends Component {
    render() {
        return (
            <Card className={ `ProductCard ProductStatus_${this.props.category}` }>
                <ProductCardHeader category={this.props.category}> Testbrand1 Lgamax Plus GB172-24, EG-E</ProductCardHeader>
                    <ul>
                        <ProductCardInformationLine category="serialNumber">7716 0104 16</ProductCardInformationLine>
                        <ProductCardInformationLine category="quantity">24.156</ProductCardInformationLine>
                        <ProductCardInformationLine category="date">11.11.2016</ProductCardInformationLine>
                        <ProductCardInformationLine category="errorQuantity">4</ProductCardInformationLine>
                    </ul>
            </Card>
        );
    }
}
export default ProductCard;

class ProductCardInformationLine extends Component {
    render() {
        return(<li className={ `ProductCardInformationLine PCIL_${this.props.category}` }>{this.props.children}</li>)
    }
}