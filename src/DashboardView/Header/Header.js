import React, { Component } from 'react';
import Boiler from '../../assets/icons/boiler.svg';
import {argosConfig} from '../../config/argosConfig.js';
import Settings from '../Settings/Settings.js';


class Header extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <header>
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="hidden-xs-down col-sm-1 d-flex justify-content-around">
                            <a href="https://bpt-lab.org/argosTT/#/">
                                <img className="product-icon" src={Boiler} alt="Overview page"/>
                            </a>
                        </div>
                        <div className="col-xs-11 col-sm-10 d-flex justify-content-around">
                            <h1 className="dashboard-title">{argosConfig.dashboardName}</h1>
                        </div>
                        <div className="hidden-xs-down col-sm-1 d-flex justify-content-around">
                            <Settings 
                                dataSource={this.props.dataSource}
                                dataSender={this.props.dataSender} />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;