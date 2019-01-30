import React from "react";
import { connect } from "react-redux";
import { Header } from "../components/Header";
import { FormMessagesConnected } from "../components/FormMessages";
import { WritersViewConnected } from "../components/WritersView";
import { GetMessagesConnected } from "../components/Messages";
import { FriendRequestsConnected } from "../components/FriendsRequestsContainer";
import { NotificationsConnected } from "../components/Notifications";

export const OwnProfilePage = props => {
  props.cleanNotifications();
  props.buttonStatusEnable();
  return (
    <React.Fragment>
      <Header />
      <WritersViewConnected author={props.author} />
      <NotificationsConnected />
      <FriendRequestsConnected author={props.author} />
      <FormMessagesConnected />
      <div className="messages-container">
        <ul>
          <h2>Mensajes: </h2>
          <GetMessagesConnected author={props.author} />
        </ul>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    cleanNotifications: () => {
      dispatch({
        type: "CLEAN_NOTIFICATIONS"
      });
    },
    buttonStatusEnable: () => {
      dispatch({
        type: "ENABLE_BUTTON"
      });
    }
  };
};

export const OwnProfilePageConnected = connect(
  null,
  mapDispatchToProps
)(OwnProfilePage);
