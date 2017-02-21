import React, { Component } from 'react';

class EventTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
        this.handleChangeQuery = this.handleChangeQuery.bind(this);
    }

    componentDidMount() {
        this.setState({ query: this.props.defaultQuery });
    }

    handleChangeQuery(event) {
        this.setState({ query: event.target.value });
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
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="form-control-label">Event Query</label>
                                    <textarea type="text" className="form-control" id="event-query" rows="8" value={this.state.query} onChange={this.handleChangeQuery}/>
                                </div>
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
} export default EventTable;