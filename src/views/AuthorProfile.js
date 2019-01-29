
import React from 'react';
import { connect } from 'react-redux';
import { WritersViewConnected } from '../components/WritersView'
import { FriendshipRequesterConnected } from '../components/FriendshipRequester'
import { Header } from '../components/Header';
import { GetMessagesConnected } from '../components/Messages';
import './Author-Profile.css';

export const SingleAuthorPage = props => {
    const username = props.userNameLogin;
    const allApprovals = props.friendshipApprovals
    if (allApprovals.hasOwnProperty(props.author) &&
        allApprovals[props.author].includes(username)) {
        
      return (
        <React.Fragment>
          <Header />
          <WritersViewConnected author={props.author} />
          <div className="messages-container">
            <ul>
              <h2>Mensajes: </h2>
              <GetMessagesConnected author={props.author} />
            </ul>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Header />
          <WritersViewConnected author={props.author} />
          <FriendshipRequesterConnected author={props.author} />
        </React.Fragment>
      );
    }
  };

const mapStateToProps = state => ({
    userNameLogin: state.userNameLogin,
    friendshipApprovals: state.friendshipApprovals
  });

export const SingleAuthorPageConnected = connect(mapStateToProps)(SingleAuthorPage)