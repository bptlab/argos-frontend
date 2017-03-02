import React, {Component} from 'react';
import Notification from '../Notification/Notification.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notification: null
        };
        this.notificationHandler = this.notificationHandler.bind(this);
    }

    notificationHandler(notification) {
        this.setState({
            notification: notification
        });
    }

    componentDidMount() {
        this.props.route.params.registerForNotificationsCallback(this.notificationHandler);
    }

    render() {
        return (
            <div>
                {this.state.notification ? (<Notification data={this.state.notification}/>) : ""}
                {this.props.children}
            </div>
        );
    }
} export default App;
