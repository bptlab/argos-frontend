import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
    }

    onSave() {
        this.props.onSave();
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#query-interface-modal">
                    {this.props.title}
                </button>
                <div className="query-interface modal fade" id="query-interface-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="query-interface-label">{this.props.title}</h5>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} export default Modal;
