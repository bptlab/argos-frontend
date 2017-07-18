import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';
import help from './../config/help';

class NotFound extends Component {

    render() {
        return (
            <ErrorMessage message={help.messages.notFound} />
        );
    }
}

export default NotFound;