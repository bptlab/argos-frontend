import React, { Component } from 'react';

class Tab extends Component {
    constructor(props) {
        super(props);
        //Function binding
        this.setActiveEventType = this.setActiveEventType.bind(this);
    }

    setActiveEventType() {
        this.props.setActiveEventType(this.props.eventType);
    }

    componentDidMount() {
        this.props.notificationService.subscribe("Event", this.setActiveEventType);
    }

    componentWillUnmount() {
        this.props.notificationService.unsubscribe("Event", this.setActiveEventType);
    }

    render() {
        return (
            <li className="tab nav-item">
                <a className="nav-link" data-toggle="tab"
                   href={'#' + this.props.eventType.name}
                   role="tab" onClick={this.setActiveEventType}>
                    {this.props.eventType.name}
                </a>
            </li>
        );
    }
}

export default Tab;
