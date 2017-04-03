import React, { Component } from 'react';
import Modal from '../../Utils/Modal/Modal.js';
import EventTypesSettings from './EventTypes/EventTypes.js';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settingsVisible: false,
        };
        //function binding
        this.modalShow = this.modalShow.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    modalShow() {
        //do not prevent default!
        this.setState({settingsVisible: true});
    }
    
    onSubmit() {
        $('#settings-modal').modal('hide');
        this.setState({settingsVisible: false});
    }
    
    componentDidMount() {
        $('#settings-modal').on('hidden.bs.modal', function () {
            /* istanbul ignore next */
            this.setState({settingsVisible: false});
        }.bind(this));
    }

    render() {
        return (
            <div className="settings">
                <a className="nav-link" data-toggle="modal" data-target="#settings-modal" onClick={this.modalShow}>
                    <i className="settings-icon fa fa-bars" />
                </a>
                <Modal title="Settings" onSubmit={this.onSubmit} id="settings" buttonText="Exit">
                    <div id="accordion" role="tablist" aria-multiselectable="true">
                        <div className="card">
                            <div className="card-header" role="tab" id="headingOne">
                                <h5 className="mb-0">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" 
                                       aria-expanded="true" aria-controls="collapseOne">
                                        Event-Types
                                    </a>
                                </h5>
                            </div>
                            <div id="collapseOne" className="collapse show" role="tabpanel" 
                                 aria-labelledby="headingOne">
                                <div className="card-block">
                                    <EventTypesSettings 
                                        dataSource={this.props.dataSource}
                                        dataSender={this.props.dataSender}
                                        settingsVisible={this.state.settingsVisible} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default Settings;
