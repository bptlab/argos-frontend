import React, { Component } from 'react';

class ConfigurationHeader extends Component {
    constructor(props) {
        super(props);
        this.selectedCodingPlugChanged = this.selectedCodingPlugChanged.bind(this);
        this.selectedSoftwareVersionChanged = this.selectedSoftwareVersionChanged.bind(this);
        this.state = {selectedCodingPlug: Object.keys(this.props.configurations)[0]};
    }

    selectedCodingPlugChanged(event) {
        this.setState({selectedCodingPlug: event.target.value,
            selectedSoftwareVersion: this.props.configurations[event.target.value][0]});
    }
    selectedSoftwareVersionChanged(event) {
        this.setState({selectedSoftwareVersion: event.target.value});
    }



    render() {
        return (
          <div id="configurationHeader">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-12 d-flex justify-content-center">
                    <div className="form-group">
                        <label htmlFor="codingPlugSelection">CP:</label>
                        <select id="codingPlugSelection" onChange={this.selectedCodingPlugChanged}>
                            {Object.keys(this.props.configurations).map(function(codingPlug, i) {
                                return <option key={i}>{codingPlug}</option>;
                            })}
                        </select>
                    </div>
                  <div className="form-group">
                    <label htmlFor="softwareVersionSelection">SW:</label>
                    <select id="softwareVersionSelection" onChange={this.selectedSoftwareVersionChanged}>
                        {this.props.configurations[this.state.selectedCodingPlug].map(function(softwareVersion, i) {
                            return <option key={i}>{softwareVersion}</option>;
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
