import React, { Component } from 'react';
import './Tab.css';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.loadEventsfor = this.loadEventsfor.bind(this);
    }

    loadEventsfor() {
        this.props.loadEventsfor(this.props.eventType);
    }

    render() {
        return (
            <li className="tab nav-item">
                <a className="nav-link" data-toggle="tab" href={'#' + this.props.eventType.name} role="tab" onClick={this.loadEventsfor}>
                    {this.props.eventType.name}
                </a>
            </li>
        );
    }
}

export default Tab;
