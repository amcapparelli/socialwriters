
import React from 'react';
import { connect } from 'react-redux';
import { WritersViewConnected } from './WritersView'
import { FriendshipRequesterConnected } from './FriendshipRequester'
import { Header } from '../components/Header';
import { GetMessages } from './Messages';
import './Author-Profile.css';

export const SingleAuthorPage = props => {
    const username = props.userNameLogin;
    if (localStorage.getItem(username + " accepted by " + props.author, true)) {
      const messagesPublished = JSON.parse(
        localStorage.getItem(props.author + " message")
      );
      return (
        <React.Fragment>
          <Header />
          <WritersViewConnected author={props.author} />
          <div className="messages-container">
            <ul>
              <h2>Mensajes: </h2>
              <GetMessages messages={messagesPublished} />
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
    userNameLogin: state.userNameLogin
  });

export const SingleAuthorPageConnected = connect(mapStateToProps)(SingleAuthorPage)