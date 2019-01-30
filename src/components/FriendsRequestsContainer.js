import React from "react";
import { connect } from "react-redux";

const FriendRequests = ({ ...props }) => {
  const { author } = props;
  const allRequests = props.friendshipRequests;
  let requests = [];
  if (allRequests.hasOwnProperty(author)) {
    requests = allRequests[author];
  }

  const getApproveRequestData = (request, author, approve) => {
    //find the index of the user requesting friendship
    const index = requests.findIndex(item => item === request);

    //Eliminate only the user approved/rejected from the array
    requests.splice(index, 1);
    
    if (approve) {
      //Get all friendship approvals
      let allApprovals = props.friendshipApprovals || {};

      //Check if approvals is not empty
      if (Object.keys(allApprovals).length > 0) {
        
        //Check If user has other approvals
        if (allApprovals.hasOwnProperty(author)) {
          allApprovals[author].push(request);

          //If user has no approvals
        } else {
          allApprovals[author] = [request];
        }

        //If this is the first new approval
      } else {
        allApprovals[author] = [request];
      }
      props.getFriendshipApprovals(allApprovals);
      props.newNotification("¡Has aceptado la solicitud!");
      props.changeButtonStatus();
    } else {
      props.newNotification("Has rechazado la solicitud... :(");
      props.changeButtonStatus();
    }
  };

  return (
    (requests &&
      requests.map(request => {
        return (
          <div key={request} className="requests-container">
            <h2>Hola {props.userNameLogin} </h2>
            <p className="">
              Tienes una solicitud de amistad de: <span>{request} </span>
            </p>
            <button
              key="accept-button"
              className=""
              data-button={request}
              onClick={() => getApproveRequestData(request, author, "approve")}
            >
              Aprobar
            </button>
            <button
              key="reject-button"
              className=""
              data-button={request}
              onClick={() => getApproveRequestData(request, author)}
            >
              Rechazar
            </button>
          </div>
        );
      })) ||
    null
  );
};

const mapStateToProps = state => ({
  buttonStatus: state.buttonStatus,
  friendshipRequests: state.friendshipRequests,
  userNameLogin: state.userNameLogin,
  friendshipApprovals: state.friendshipApprovals
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
    getFriendshipApprovals: obj => {
      dispatch({
        type: "ADD_APPROVAL",
        value: obj
      });
    }
  };
};

export const FriendRequestsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendRequests);