import React, { Component } from 'react';

class RemovableInputField extends Component {
    constructor(props) {
        super(props);
        //Function binding
        this.handleInput = this.handleInput.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleInput(event) {
        this.props.onInputChange(this.props.id, event.target.value);
    }

    handleRemove() {
        this.props.onInputChange(this.props.id, '');
    }

    addRemoveButton() {
        if (this.props.displayRemoveButton){
            return (
                <button className="input-group-addon"
                        id="remove-addon"
                        onClick={this.handleRemove}>
                    <i className="fa fa-times" />
                </button>
            );
        }
    }

    render() {
        return (
            <div className="input-field input-group col-xs-12 col-sm-4 col-lg-3">
                <span className="input-group-addon" id="search-addon">
                    <i className="fa fa-search" />
                </span>
                <input type="text"
                       className="form-control"
                       placeholder={this.props.placeholder}
                       value={this.props.filterText} onChange={this.handleInput}/>
                {this.addRemoveButton()}
            </div>
        );
    }
}

export default RemovableInputField;