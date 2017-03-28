import React, { Component } from 'react';
import StatusPoint from './StatusPoint/StatusPoint.js';
import ConfigurationHeader from './ConfigurationHeader/ConfigurationHeader.js';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="hidden-xs-down col-sm-1 d-flex justify-content-center">
                            <a href="/#">
                                <i className="home-button fa fa-home" />
                            </a>
                        </div>
                        <div className="row col-xs-12 col-sm-10 d-flex justify-content-around">
                            <div className="col-12 d-flex justify-content-center">
                                <h1 className="dashboard-title">{this.props.product.name}</h1>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <ConfigurationHeader product={this.props.product} configurations={this.props.configurations} setProductConfiguration={this.props.setProductConfiguration}/>
                            </div>
                        </div>
                        <div className="hidden-xs-down col-sm-1 d-flex justify-content-around">
                            <StatusPoint product={this.props.product}/>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
