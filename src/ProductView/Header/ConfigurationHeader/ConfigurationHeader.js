import React, { Component } from 'react';

class ConfigurationHeader extends Component {
    constructor(props) {
        super(props);
        this.codingPlugSelectionChanged = this.codingPlugSelectionChanged.bind(this);
        this.state = {possibleSoftwareVerions: ["4.0.0"]};
    }

    codingPlugSelectionChanged(event) {
        this.setState({possibleSoftwareVerions: this.props.configurations[event.target.value]});
    }

    render() {
        return (
          <div id="configurationHeader">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-12 d-flex justify-content-center">
                    <div className="form-group">
                        <label htmlFor="codingPlugSelection">CP:</label>
                        <select id="codingPlugSelection" onChange={this.codingPlugSelectionChanged}>
                            {Object.keys(this.props.configurations).map(function(codingPlug) {
                                return <option>{codingPlug}</option>;
                            })}
                        </select>
                    </div>
                  <div className="form-group">
                    <label htmlFor="softwareVersionSelection">SW:</label>
                    <select id="softwareVersionSelection">
                        {this.state.possibleSoftwareVerions.map(function(softwareVersion) {
                            return <option>{softwareVersion}</option>;
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default ConfigurationHeader;
