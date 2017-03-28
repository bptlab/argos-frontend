import React, { Component } from 'react';

class ConfigurationHeader extends Component {
    constructor(props) {
        super(props);
        this.selectedCodingPlugChanged = this.selectedCodingPlugChanged.bind(this);
        this.selectedSoftwareVersionChanged = this.selectedSoftwareVersionChanged.bind(this);
        let initialCodingPlugVersion = Object.keys(this.props.configurations)[0];
        this.state = {selectedCodingPlug: initialCodingPlugVersion,
                        selectedSoftwareVersion: this.props.configurations[initialCodingPlugVersion][0]};
    }

    selectedCodingPlugChanged(event) {
        let newCodingPlug = event.target.value;
        let newSoftwareVersion = this.props.configurations[newCodingPlug][0];
        this.setState({selectedCodingPlug: newCodingPlug,
            selectedSoftwareVersion: newSoftwareVersion});
        this.props.setProductConfiguration(newCodingPlug, newSoftwareVersion);
    }

    selectedSoftwareVersionChanged(event) {
        this.setState({selectedSoftwareVersion: event.target.value});
        this.props.setProductConfiguration(this.state.selectedCodingPlug, event.target.value);
    }

    render() {
        return (
            <div className="row col-12 d-flex justify-content-center">
                <div className="col-3 d-flex">
                    <div className="form-group">
                        <label htmlFor="codingPlugSelection">CP:</label>
                        <select id="codingPlugSelection" value={this.state.selectedCodingPlug} onChange={this.selectedCodingPlugChanged}>
                            {Object.keys(this.props.configurations).map(function(codingPlug, i) {
                                return <option key={i}>{codingPlug}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-around">
                      <div className="form-group">
                          <label htmlFor="softwareVersionSelection">SW:</label>
                          <select id="softwareVersionSelection" value={this.state.selectedSoftwareVersion} onChange={this.selectedSoftwareVersionChanged}>
                              {this.props.configurations[this.state.selectedCodingPlug].map(function(softwareVersion, i) {
                                  return <option key={i}>{softwareVersion}</option>;
                              })}
                          </select>
                      </div>
                </div>
            </div>
        );
    }
}

export default ConfigurationHeader;
