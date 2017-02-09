import React, { Component } from 'react';

class CardHeader extends Component {
    render() {
        return (
            <h4 className={ `card-title ProductCardTitle ProductCardTitle_${this.props.category}` }>
                {this.props.children}
            </h4>
        );
    }
}

export default CardHeader;