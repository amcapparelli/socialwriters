import React from "react";
import { connect } from "react-redux";

export const GetMessages = ({ ...props }) => {
  const authorMessages = props.allMessages[props.author];

  return (
    (authorMessages &&
      authorMessages.map(message => {
        return <li key={message}>{message}</li>;
      })) || <p>Este usuario todavía no ha publicado mensajes</p>
  );
};

const mapStateToProps = state => ({
  allMessages: state.allMessages
});

export const GetMessagesConnected = connect(mapStateToProps)(GetMessages);
