import React, {Component} from 'react';
class Notification extends Component {
    componentWillReceiveProps() {
        $(document).ready(function () {
            $('#notification')[0].style.animation = "fade 5s linear";
            $('#notification')[0].addEventListener('animationend', function(){
                this.style.animation = '';
            }, false);
            $('#notification')[0].style.webkitAnimation = "fade 5s linear";
            $('#notification')[0].addEventListener('webkitAnimationEnd', function(){
                this.style.webkitAnimation = '';
            }, false);
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