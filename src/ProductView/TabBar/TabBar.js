import React, { Component } from 'react';
import QueryInterface from './QueryInterface/QueryInterface.js';
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
                    <li>
                        <QueryInterface
                            dataSource={this.props.dataSource}
                            defaultQuery="INSERT INTO TestErrorEvents SELECT timestamp, productId, productFamilyId FROM FeedbackData"/>
                    </li>
                </ul>
            </div>
        );
    }
} export default TabBar;
