import React, { Component } from 'react';
import Tab from './Tab/Tab.js';

class TabBar extends Component {
    render() {
        return (
            <div className="tab-bar container">
                <ul className="nav nav-tabs border-0" role="tablist">
                    {this.props.eventTypes.map((eventType, index) =>
                        <Tab key={index}
                             id={index}
                             eventType={eventType}
                             setActiveEventType={this.props.setActiveEventType}/>
                    )}
                </ul>
            </div>
        );
    }
} export default TabBar;
