import React, { Component } from 'react';

class QueryInterfaceHeader extends Component {

    render() {
        return (
            <div className="query-interface-header">
                <div className="form-group">
                    <input className="form-control" type="text" placeholder="Name" id="query-name"/>
                </div>
                <div className="form-group row">
                    <div className="col-6">
                        <input className="form-control" type="text" placeholder="Attribute name" id="example-text-input"/>
                    </div>
                    <div className="col-6">
                        <select className="form-control" id="exampleSelect1">
                            <option>String</option>
                            <option>Boolean</option>
                            <option>Integer</option>
                            <option>Float</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
} export default QueryInterfaceHeader;
