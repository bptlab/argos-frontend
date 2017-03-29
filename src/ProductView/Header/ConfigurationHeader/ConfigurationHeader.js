import React, { Component } from 'react';

class ConfigurationHeader extends Component {
    constructor(props) {
        super(props);
        this.selectedCodingPlugChanged = this.selectedCodingPlugChanged.bind(this);
        this.selectedSoftwareVersionChanged = this.selectedSoftwareVersionChanged.bind(this);
        this.cpSwToIdMapping = {};
        for (let configuration of this.props.configurations) {
            if(!this.cpSwToIdMapping[configuration.codingPlugId]) {
                this.cpSwToIdMapping[configuration.codingPlugId] = {};
            }
            for (let softwareVersion of configuration.codingPlugSoftwareVersions) {
                this.cpSwToIdMapping[configuration.codingPlugId][softwareVersion] = configuration.id;
            }
        }
        let initialCodingPlugVersion = Object.keys(this.cpSwToIdMapping)[0];
        this.state = {selectedCodingPlug: initialCodingPlugVersion,
                        selectedSoftwareVersion: Object.keys(this.cpSwToIdMapping[initialCodingPlugVersion])[0]};
        this.updateProductConfiguration(this.state.selectedCodingPlug, this.state.selectedSoftwareVersion);
    }

    updateProductConfiguration(newCodingPlug, newSoftwareVersion) {
        this.props.setProductConfiguration(this.cpSwToIdMapping[newCodingPlug][newSoftwareVersion]);
    }

    selectedCodingPlugChanged(event) {
        let newCodingPlug = event.target.value;
        let newSoftwareVersion = Object.keys(this.cpSwToIdMapping[newCodingPlug])[0];
        this.setState({selectedCodingPlug: newCodingPlug,
            selectedSoftwareVersion: newSoftwareVersion});
        this.updateProductConfiguration(newCodingPlug, newSoftwareVersion);
    }

    selectedSoftwareVersionChanged(event) {
        this.setState({selectedSoftwareVersion: event.target.value});
        this.updateProductConfiguration(this.state.selectedCodingPlug, event.target.value);
    }

    render() {
        return (
            <div className="row col-12 d-flex justify-content-center">
                <div className="col-3 d-flex">
                    <div className="form-group">
                        <label htmlFor="codingPlugSelection">CP:</label>
                        <select id="codingPlugSelection" value={this.state.selectedCodingPlug} onChange={this.selectedCodingPlugChanged}>
                            {Object.keys(this.cpSwToIdMapping).map(function(codingPlug, i) {
                                return <option key={i}>{codingPlug}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-around">
                      <div className="form-group">
                          <label htmlFor="softwareVersionSelection">SW:</label>
                          <select id="softwareVersionSelection" value={this.state.selectedSoftwareVersion} onChange={this.selectedSoftwareVersionChanged}>
                              {Object.keys(this.cpSwToIdMapping[this.state.selectedCodingPlug]).map(function(softwareVersion, i) {
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
