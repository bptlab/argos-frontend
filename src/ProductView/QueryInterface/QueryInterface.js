import React, { Component } from 'react';
import QueryInterfaceHeader from './QueryInterfaceHeader/QueryInterfaceHeader.js';

class QueryInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            match: ''
        };
        this.handleChangeQuery = this.handleChangeQuery.bind(this);
    }

    componentDidMount() {
        this.setState({ query: this.props.defaultQuery });
    }

    handleChangeQuery(event) {
        this.validateQuery(event.target.value);

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
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#query-interface-modal">
                    Create Event Query
                </button>
                <div className="query-interface modal fade" id="query-interface-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="query-interface-label">New Event Query</h5>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <QueryInterfaceHeader/>
                                <div className="form-group">
                                    <label htmlFor="event-query" className="form-control-label">Event Query</label>
                                    <textarea type="text" className="form-control" id="event-query" rows="8" value={this.state.query} onChange={this.handleChangeQuery}/>
                                </div>
                                <p>{this.state.match}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} export default QueryInterface;