import React from "react";
import { connect } from "react-redux";

const FormMessages = ({ ...props }) => {
  const getNewMessage = e => props.getMessage(e.target.value);

  function publishMessage(e) {
    e.preventDefault();
    let allMessages = [];
    if (localStorage.getItem(sessionStorage.getItem("userID") + " message")) {
      allMessages = JSON.parse(
        localStorage.getItem(sessionStorage.getItem("userID") + " message")
      );
      allMessages.push(props.newMessage);
    } else {
      allMessages.push(props.newMessage);
    }
    localStorage.setItem(
      sessionStorage.getItem("userID") + " message",
      JSON.stringify(allMessages)
    );
    const textarea = document.querySelector(".textarea");
    textarea.value = "";
    props.newNotification("¡¡Mensaje publicado con éxito!!");
  }

  return (
    <form onSubmit={publishMessage}>
      <div className="message-form">
        <h3>¡Publica un nuevo mensaje!</h3>
        <textarea
          rows="4"
          cols="130"
          maxLength="150"
          className="textarea"
          defaultValue="Hasta 150 caraceteres"
          onChange={getNewMessage}
        />
        <br />
        <button>Publicar</button>
        <div className="notifications">{props.notifications}</div>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  newMessage: state.newMessage,
  notifications: state.newNotification
});

const mapDispatchToProps = dispatch => {
  return {
    getMessage: msg => {
      dispatch({
        type: "NEW_MESSAGE",
        value: msg
      });
    },
    newNotification: msg => {
      dispatch({
        type: "NEW_NOTIFICATION",
        value: msg
      });
    }
  };
};

export const FormMessagesConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormMessages);