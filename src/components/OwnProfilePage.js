import React from "react";
import { Header } from "../components/Header";
import { connect } from "react-redux";
import { FormMessagesConnected } from "./FormMessages";
import { WritersView } from "./AuthorProfile";
import { GetMessages } from "./Messages";

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
      <WritersView author={props.author} />
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

const FriendRequests = ({ ...props }) => {
    const {requests, author} = props
    let buttonStatus = !props.buttonStatus;

    const postNotificationFriendshipStatus = ( approve ) => {
      props.changeButtonStatus()
      if (approve) {
        props.newNotification("¡Has aceptado la solicitud!");
      } else {
        props.newNotification("Has rechazado la solicitud... :(");
      }
    };
    
    const getApproveRequestData = (request, author, approve) => {
      //Get all requests from localStorage into an Array
      const allRequests = JSON.parse(
        localStorage.getItem(author + " requested by ")
      );
    
      //find the index of the user requesting friendship
      const index = allRequests.findIndex(item => item === request);
    
      //Eliminate only the user approved/rejected from the array
      allRequests.splice(index, 1);
    
      //Set a new Array in localStorage
      localStorage.setItem(author + " requested by ", JSON.stringify(allRequests));
    
      if (approve) {
        localStorage.setItem(request + " accepted by " + author, true);
        postNotificationFriendshipStatus(approve);
      } else {
        postNotificationFriendshipStatus();
      }
    };
    
    return(
        (requests &&
          requests.map(request => {
            return (
              <div key={request} className="requests-container">
                <h2>Hola {sessionStorage.getItem("activeUser")} </h2>
                <p className={buttonStatus ? "" : "hidden"} data-name={request}>
                  Tienes una solicitud de amistad de: <span>{request} </span>
                </p>
                <button
                  key="accept-button"
                  className={buttonStatus ? "" : "hidden"}
                  data-button={request}
                  onClick={() => getApproveRequestData(request, author, "approve")}
                >
                  Aprobar
                </button>
                <button
                  key="reject-button"
                  className={buttonStatus ? "" : "hidden"}
                  data-button={request}
                  onClick={() => getApproveRequestData(request, author)}
                >
                  Rechazar
                </button>
                <p className="notifications">{props.notifications}</p>
              </div>
            );
          })) ||
        null
    )
}

export default OwnProfilePage;

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

const FriendRequestsConnected = connect(mapStateToProps, mapDispatchToProps)(FriendRequests)