import React, { Component } from 'react';

class Tab extends Component {
    constructor(props) {
        super(props);
        //Function binding
        this.loadEventsFor = this.loadEventsFor.bind(this);
    }

    loadEventsFor() {
        this.props.loadEventsFor(this.props.eventType);
    }

    componentDidMount() {
        const callbackWithArgument = function() {
            this.loadEventsFor(this.props.eventType);
        }.bind(this);
        this.props.notificationService.subscribe("Event", callbackWithArgument);
    }

    componentWillUnmount() {
        const callbackWithArgument = function() {
            this.loadEventsFor(this.props.eventType);
        }.bind(this);
        this.props.notificationService.unsubscribe("Event", callbackWithArgument);
    }

    render() {
        return (
            <li className="tab nav-item">
                <a className="nav-link" data-toggle="tab"
                   href={'#' + this.props.eventType.name}
                   role="tab" onClick={this.loadEventsFor}>
                    {this.props.eventType.name}
                </a>
            </li>
        );
    }
}

export default Tab;
