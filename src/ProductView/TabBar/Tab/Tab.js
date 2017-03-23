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
        if(this.props.id === 0) {
            this.tabLink.click();
        }
    }

    render() {
        return (
            <li className="tab nav-item">
                <a className="nav-link" data-toggle="tab"
                   href={'#' + this.props.eventType.name}
                   role="tab" onClick={this.setActiveEventType}
                   ref={(a) => { this.tabLink = a; }}>
                    {this.props.eventType.name}
                </a>
            </li>
        );
    }
}

export default Tab;
