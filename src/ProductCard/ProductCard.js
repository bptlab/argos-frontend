import React, { Component } from 'react';
import {Card} from 'reactstrap';
import './ProductCard.css';
import ProductCardHeader from './ProductCardHeader.js';

class ProductCard extends Component {
    render() {
        return (
            <Card className={ `ProductCard ProductCard_${this.props.product.state}` }>
                <ProductCardHeader category={this.props.product.state}>{this.props.product.metaData.brand} {this.props.product.metaData.label}</ProductCardHeader>
                    <ul>
                        <ProductCardInformationLine category="serialNumber">{this.props.product.metaData.orderNumber}</ProductCardInformationLine>
                        <ProductCardInformationLine category="quantity">{this.props.product.numberOfDevices}</ProductCardInformationLine>
                        <ProductCardInformationLine category="date">{this.props.product.productionStart}</ProductCardInformationLine>
                        <ProductCardInformationLine category="errorQuantity">{this.props.product.numberOfEvents}</ProductCardInformationLine>
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