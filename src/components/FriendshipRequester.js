import React from 'react';
import { connect } from 'react-redux';

const FriendshipRequester = ({ ...props }) => {
    let buttonStatus = !props.buttonStatus;
  
    const getFriendshipRequest = () => {
      const userRequesting = sessionStorage.getItem("activeUser");
      const userRequested = props.author;
      let userPendingRequests = [];
      props.changeButtonStatus();
  
      if (localStorage.getItem(userRequested + " requested by ")) {
        userPendingRequests = JSON.parse(
          localStorage.getItem(userRequested + " requested by ")
        );
  
        // Check if user already send a friendship request before to not duplicate it
        if (userPendingRequests.indexOf(userRequesting) >= 0) {
          props.newNotification("Ya has solicitado seguir a este usuario antes");
          return;
        } else {
          userPendingRequests.push(userRequesting);
        }
      } else {
        userPendingRequests.push(userRequesting);
      }
  
      localStorage.setItem(
        userRequested + " requested by ",
        JSON.stringify(userPendingRequests)
      );
      props.newNotification("solicitud de amistad enviada");
    };
    return (
      <div>
        <button
          className={buttonStatus ? "follow-button" : "hidden"}
          onClick={() => {
            getFriendshipRequest(props.author);
          }}
        >
          Follow Author
        </button>
        <p className="notifications">{props.notifications}</p>
      </div>
    );
  };

  const mapStateToProps = state => ({
    notifications: state.newNotification,
    buttonStatus: state.buttonStatus
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      newNotification: msg => {
        dispatch({
          type: "NEW_NOTIFICATION",
          value: msg
        });
      },
      changeButtonStatus: () => {
        dispatch({
          type: "DISABLE_BUTTON"
        });
      }
    };
  };

export const FriendshipRequesterConnected = connect(mapStateToProps, mapDispatchToProps)(FriendshipRequester)