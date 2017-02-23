import React, { Component } from 'react';
import Modal from './Modal/Modal.js';
import QueryInterfaceHeader from './QueryInterfaceHeader/QueryInterfaceHeader.js';

class QueryInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventTypeName: '',
            eventTypeAttributes: {},
            query: '',
            match: ''
        };
        this.handleChangeQuery = this.handleChangeQuery.bind(this);
        this.handleSaveQuery = this.handleSaveQuery.bind(this);
    }

    componentDidMount() {
        this.setState({ query: this.props.defaultQuery });
    }

    handleChangeQuery(event) {
        this.validateQuery(event.target.value);

    }

    handleSaveQuery() {
        this.validateEventType();
        this.validateQuery(this.state.query);

    }

    validateEventType() {
    }

    validateQuery(query) {
        if (query.match(/INSERT INTO (\w*)\[\s?timestamp:\s?Date,\s?productId:\s?Integer,\s?productFamilyId:\s?String\s?(?:,\s?(\w*):\s?(\w*)){0,}\s?\]/i)) {
            let myRegexp = /INSERT INTO (\w*)\[\s?timestamp:\s?Date,\s?productId:\s?Integer,\s?productFamilyId:\s?String\s?(?:,\s?(\w*):\s?(\w*)){0,}\s?\]/i;
            let match = myRegexp.exec(query);
            console.log(match[1]);
            console.log(match.length);
            for (let i = 2; i < match.length; i=i+2) {
                console.log(match[i]);
                console.log(match[i+1]);
            }
            this.setState({ match: 'true', query: query });
        }
        else {
            this.setState({ match: 'false', query: query });
        }
    }

    render() {
        return (
            <div className="query-interface">
                <Modal title="Create new query" onSave={this.handleSaveQuery}>
                    <QueryInterfaceHeader/>
                    <div className="form-group">
                        <label htmlFor="event-query" className="form-control-label">Event Query</label>
                        <textarea type="text" className="form-control" id="event-query" rows="8" value={this.state.query} onChange={this.handleChangeQuery}/>
                    </div>
                    <p>{this.state.errors}</p>
                </Modal>
            </div>
        );
    }
} export default QueryInterface;