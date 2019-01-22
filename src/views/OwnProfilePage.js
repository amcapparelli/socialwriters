import React from "react";
import { Header } from "../components/Header";
import { FormMessagesConnected } from "../components/FormMessages";
import { WritersViewConnected } from "../components/WritersView";
import { GetMessagesConnected } from "../components/Messages";
import { FriendRequestsConnected } from '../components/FriendsRequestsContainer'
import { NotificationsConnected } from '../components/Notifications'

export const OwnProfilePage = props => {
  return (
    <React.Fragment>
      <Header />
      <WritersViewConnected author={props.author} />
      <NotificationsConnected/>
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

export default OwnProfilePage;