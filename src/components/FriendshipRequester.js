import React from "react";
import { connect } from "react-redux";

const FriendshipRequester = ({ ...props }) => {
  let buttonStatus = !props.buttonStatus;

  const getFriendshipRequest = () => {
    const userRequesting = props.userName;
    const userRequested = props.author;
  
    //get all Friendship Pending Requests
    let allPendingRequests = props.getFriendshipRequests || {};
  
    //Check if pending requests is not empty
    if (Object.keys(allPendingRequests).length > 0) {
      
      //Check is user has other pending requests and check if this request is repeated
      if (
        allPendingRequests.hasOwnProperty(userRequested) &&
        allPendingRequests[userRequested].includes(userRequesting)
      ) {
        props.newNotification("Ya has pedido amistad a este usuario antes");
        return;

        //If user has other requests but this request is new
      } else if (allPendingRequests.hasOwnProperty(userRequested)) {
        allPendingRequests[userRequested].push(userRequesting);

        //If user has no requests
      } else {
        allPendingRequests[userRequested] = [userRequesting];
      }

      //If this is the first new request
    } else {
      allPendingRequests[userRequested] = [userRequesting];
    }
    props.addFriendshipRequest(allPendingRequests);
    props.newNotification("solicitud de amistad enviada");
    props.changeButtonStatus();
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
  buttonStatus: state.buttonStatus,
  userName: state.userNameLogin,
  getFriendshipRequests: state.friendshipRequests
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
    },
    addFriendshipRequest: obj => {
      dispatch({
        type: "ADD_REQUEST",
        value: obj
      });
    }
  };
};

export const FriendshipRequesterConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendshipRequester);
