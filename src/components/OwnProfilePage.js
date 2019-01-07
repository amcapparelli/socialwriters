import React from "react";
import { Header } from "../components/Header";
import { FormMessagesConnected } from "./FormMessages";
import { WritersViewConnected } from "./WritersView";
import { GetMessages } from "./Messages";
import { FriendRequestsConnected } from './FriendsRequestsContainer'

export const OwnProfilePage = props => {
  const requests = JSON.parse(
    localStorage.getItem(props.author + " requested by ")
  );
  const messagesPublished = JSON.parse(
    localStorage.getItem(props.author + " message")
  );
  return (
    <React.Fragment>
      <Header />
      <WritersViewConnected author={props.author} />
      <FriendRequestsConnected requests={requests} author={props.author} />
      <FormMessagesConnected />
      <div className="messages-container">
        <ul>
          <h2>Mensajes: </h2>
          <GetMessages messages={messagesPublished} />
        </ul>
      </div>
    </React.Fragment>
  );
};

export default OwnProfilePage;