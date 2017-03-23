import React, { Component } from 'react';

class InputField extends Component {
    constructor(props) {
        super(props);
        //Function binding
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(event) {
        this.props.onInputChange(this.props.id, event.target.value);
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
            </div>
        );
    }
}

export default InputField;