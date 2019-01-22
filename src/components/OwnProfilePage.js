import React from "react";
import { Header } from "../components/Header";
import { FormMessagesConnected } from "./FormMessages";
import { WritersViewConnected } from "./WritersView";
import { GetMessagesConnected } from "./Messages";
import { FriendRequestsConnected } from './FriendsRequestsContainer'
import { NotificationsConnected } from './Notifications'

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