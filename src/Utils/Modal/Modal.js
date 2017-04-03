import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        this.props.onSubmit();
    }

    render() {
        return (
            <div className={`${this.props.id} modal fade`} id={`${this.props.id}-modal`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${this.props.id}-label`}>{this.props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" ref="close-modal">
                                <span id="close">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn"
                                    onClick={this.onSubmit}
                                    disabled={!this.props.isAbleToSave && `disabled`}>
                                <div>
                                {this.props.loading && <i className="fa fa-circle-o-notch fa-spin"></i>}
                                {!this.props.loading && this.props.buttonText}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} export default Modal;
