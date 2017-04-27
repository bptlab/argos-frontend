import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import config from './../config/config';

class NotFound extends Component {

    render() {
        return (
            <ErrorMessage message={config.notFoundMessage} />
        );
    }
}

export default NotFound;