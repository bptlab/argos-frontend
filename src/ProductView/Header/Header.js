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
                                    <i className="home-button fa fa-home"/>
                                </a>
                            </div>
                            <div className="col-10 d-flex justify-content-center">
                                <ConfigurationHeader 
                                    configurations={this.props.configurations} 
                                    onChangeProductConfiguration={this.props.onChangeProductConfiguration}/>
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
