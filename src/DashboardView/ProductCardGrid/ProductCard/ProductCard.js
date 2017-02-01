import React, { Component } from 'react';
import {Card} from 'reactstrap';
import './ProductCard.css';
import ProductCardHeader from './ProductCardHeader/CardHeader.js';

class ProductCard extends Component {
    render() {
        return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <a href={ `/#/product/${this.props.product.id}`} title={ `Details for ${this.props.product.name}`}>
                    <Card className={ `ProductCard ProductCard_${this.props.product.state}` }>
                        <ProductCardHeader category={this.props.product.state}>
                            {this.props.product.name}
                        </ProductCardHeader>
                        <ul>
                            <ProductCardInformationLine category="serialNumber">
                                {this.props.product.orderNumber}
                            </ProductCardInformationLine>
                            <ProductCardInformationLine category="quantity">
                                {this.props.product.numberOfDevices}
                            </ProductCardInformationLine>
                            <ProductCardInformationLine category="date">
                                {this.props.product.productionStart}
                            </ProductCardInformationLine>
                            <ProductCardInformationLine category="errorQuantity">
                                {this.props.product.numberOfEvents}
                            </ProductCardInformationLine>
                            </ul>
                    </Card>
                </a>
            </div>
        );
    }
}
export default ProductCard;

class ProductCardInformationLine extends Component {
    render() {
        return(
            <li className={ `ProductCardInformationLine PCIL_${this.props.category}` }>
                {this.props.children}
            </li>
        )
    }
}