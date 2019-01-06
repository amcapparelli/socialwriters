import React from "react";

export const GetMessages = ({ messages }) =>
  (messages &&
    messages.map(message => {
      return <li key={message}>{message}</li>;
    })) || <p>Este usuario todavía no ha publicado mensajes</p>;

export default GetMessages;