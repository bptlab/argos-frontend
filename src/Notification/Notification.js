import React, {Component} from 'react';
class Notification extends Component {
    render() {
        return(
            <div className={`alert alert-${this.props.data.type}`} role="alert">
                <table>
                    <tbody>
                    <tr>
                        <td><i className="fa fa-info-circle" /></td>
                        <td><p>{this.props.data.message}</p></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
} export default Notification;