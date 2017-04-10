import React, { Component } from 'react';

class ConfirmOverlay extends Component {
    constructor(props) {
        super(props);
        this.onAbort = this.onAbort.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        this.props.onSubmit();
    }

    onAbort() {
        this.props.onAbort();
    }

    render() {
        return (
            <div className={`${this.props.id} modal fade`} id={`${this.props.id}-modal`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${this.props.id}-label`}>{this.props.title}</h5>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn"
                                    onClick={this.onAbort}>
                                <div>
                                    {this.props.abortButtonText}
                                </div>
                            </button>
                            <button type="button" className="btn"
                                    onClick={this.onSubmit}>
                                <div>
                                    {this.props.submitButtonText}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} export default ConfirmOverlay;

