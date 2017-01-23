import React, { Component } from 'react';
import './Tabbar.css';

class Tabbar extends Component {
    render() {
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    {this.props.eventTypes.map((eventType, index) => <li className="nav-item"><a className="nav-link active" data-toggle="tab" href={'#' + eventType.name} role="tab">{eventType.name}</a></li>)}
                </ul>
            </div>
        );
    }
}

export default Tabbar;
