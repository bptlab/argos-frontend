import React, { Component } from 'react';

class ConfigurationHeader extends Component {
    constructor(props) {
        super(props);
        this.selectedCodingPlugChanged = this.selectedCodingPlugChanged.bind(this);
        this.selectedSoftwareVersionChanged = this.selectedSoftwareVersionChanged.bind(this);
        this.toggleShowAll = this.toggleShowAll.bind(this);
        this.buildCodingPlugAndSoftwareVersionToIdMapping();
        const initialCodingPlugVersion = Object.keys(this.cpSwToIdMapping)[0];
        this.state = {selectedCodingPlug: initialCodingPlugVersion,
                        selectedSoftwareVersion: Object.keys(this.cpSwToIdMapping[initialCodingPlugVersion])[0],
                        showAll: true};
    }

    buildCodingPlugAndSoftwareVersionToIdMapping() {
        this.cpSwToIdMapping = {};
        for (const configuration of this.props.configurations) {
            if(!this.cpSwToIdMapping[configuration.codingPlugId]) {
                this.cpSwToIdMapping[configuration.codingPlugId] = {};
            }
            for (const softwareVersion of configuration.codingPlugSoftwareVersions) {
                this.cpSwToIdMapping[configuration.codingPlugId][softwareVersion] = configuration.id;
            }
        }
    }

    updateProductConfiguration(newCodingPlug, newSoftwareVersion) {
        this.props.setProductConfiguration(this.cpSwToIdMapping[newCodingPlug][newSoftwareVersion]);
    }

    selectedCodingPlugChanged(event) {
        const newCodingPlug = event.target.value;
        const newSoftwareVersion = Object.keys(this.cpSwToIdMapping[newCodingPlug])[0];
        this.setState({selectedCodingPlug: newCodingPlug,
            selectedSoftwareVersion: newSoftwareVersion});
        this.updateProductConfiguration(newCodingPlug, newSoftwareVersion);
    }

    selectedSoftwareVersionChanged(event) {
        this.setState({selectedSoftwareVersion: event.target.value});
        this.updateProductConfiguration(this.state.selectedCodingPlug, event.target.value);
    }

    toggleShowAll(event) {
        this.setState({showAll: event.target.checked});
        if(event.target.checked) {
            this.props.setProductConfiguration(null);
        }
        else {
            this.updateProductConfiguration(this.state.selectedCodingPlug, this.state.selectedSoftwareVersion);
        }
    }

    render() {
        return (
            <div className="row col-12 d-flex justify-content-center">
                <div className="col-4 d-flex justify-content-around">
                      <div className="form-group">
                          <input type="checkbox" id="showAllCheckbox" checked={this.state.showAll} onChange={this.toggleShowAll}/>
                          <label htmlFor="softwareVersionSelection">show all configurations</label>
                      </div>
                </div>
                <div className="col-3 d-flex">
                    <div className="form-group">
                        <label htmlFor="codingPlugSelection" hidden={this.state.showAll}>CP:</label>
                        <select id="codingPlugSelection" value={this.state.selectedCodingPlug} onChange={this.selectedCodingPlugChanged} disabled={this.state.showAll}>
                            {Object.keys(this.cpSwToIdMapping).map(function(codingPlug, i) {
                                return <option key={i}>{codingPlug}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-around">
                      <div className="form-group">
                          <label htmlFor="softwareVersionSelection" hidden={this.state.showAll}>SW:</label>
                          <select id="softwareVersionSelection" value={this.state.selectedSoftwareVersion} onChange={this.selectedSoftwareVersionChanged} disabled={this.state.showAll}>
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
