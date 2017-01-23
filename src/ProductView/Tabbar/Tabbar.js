import React, { Component } from 'react';
import './Tabbar.css';
import Tab from './Tab/Tab.js';

class Tabbar extends Component {
    render() {
        return (
            <ul className="nav nav-tabs" role="tablist">
                {this.props.eventTypes.map((eventType, index) =>
                    <Tab key={index} eventType={eventType} loadEventsfor={this.props.loadEventsfor}/>
                )}
            </ul>
        );
    }
}

export default Tabbar;
