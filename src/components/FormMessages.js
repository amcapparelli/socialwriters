import React from "react";
import { connect } from "react-redux";

const FormMessages = ({ ...props }) => {

  const getNewMessage = e => props.getMessage(e.target.value);
  const author = props.author

  const publishMessage= (e) => {
    e.preventDefault();
    let allMessages = props.allMessages;
    
    if (allMessages.hasOwnProperty(author)) {
      allMessages[author].push(props.newMessage)
    } else {
      allMessages[author] = [props.newMessage]
    }

    props.publishAllMessages(allMessages)
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
          defaultValue="Hasta 150 caracteres"
          onChange={getNewMessage}
        />
        <br />
        <button>Publicar</button>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  newMessage: state.newMessage,
  author: state.activeUser,
  allMessages: state.allMessages
});

const mapDispatchToProps = dispatch => {
  return {
    getMessage: msg => {
      dispatch({
        type: "NEW_MESSAGE",
        value: msg
      });
    },
    publishAllMessages: obj => {
      dispatch({
        type: "ALL_MESSAGES",
        value: obj
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