import React, { Component } from 'react';
import './Tabbar.css';
import Tab from './Tab/Tab.js';

class Tabbar extends Component {
    render() {
        return (
            <div className="tabbar container">
                <ul className="nav nav-tabs border-0" role="tablist">
                    {this.props.eventTypes.map((eventType, index) =>
                        <Tab key={index} eventType={eventType} 
                             loadEventsfor={this.props.loadEventsfor} 
                             product={this.props.product}/>
                    )}
                </ul>
            </div>
        );
    }
}

export default Tabbar;
