import React, {Component} from 'react';
class Notification extends Component {

    /* istanbul ignore next */
    componentWillReceiveProps() {
        $(document).ready(function () {
            $('#notification').removeClass('sliding-animation');
            $('#notification').addClass('sliding-animation');
        });
    }

    render() {
        return(
            <div className={`alert-sliding alert-sliding-${this.props.data.type}`} id="notification" role="alert">
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