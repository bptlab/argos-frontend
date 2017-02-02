import React, { Component } from 'react';
import './TabBar.css';
import Tab from './Tab/Tab.js';

class TabBar extends Component {
    render() {
        return (
            <div className="tab-bar container">
                <ul className="nav nav-tabs border-0" role="tablist">
                    {this.props.eventTypes.map((eventType, index) =>
                        <Tab key={index}
                             eventType={eventType}
                             loadEventsFor={this.props.loadEventsFor}
                             product={this.props.product}/>
                    )}
                </ul>
            </div>
        );
    }
} export default TabBar;
