import React, { Component } from 'react';
import ProductCardHeader from './ProductCardHeader/ProductCardHeader.js';

class ProductCard extends Component {
    render() {
        return (
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-uhd-2">
                <a href={ `https://bpt-lab.org/argosTT/#/product/${this.props.product.id}`} title={ `Details for ${this.props.product.name}`}>
                    <div className={ `card ProductCard ProductCard_${this.props.product.state}` }>
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
                    </div>
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
        );
    }
}