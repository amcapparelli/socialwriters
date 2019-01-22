import React from "react";
import { connect } from "react-redux";

const Notifications = ({...props}) => {
    return (
        <p className="notifications">{props.notification}</p>
    )
}

const mapStateToProps = state => ({
    notification: state.newNotification
});
  
export const NotificationsConnected = connect(mapStateToProps)(Notifications);