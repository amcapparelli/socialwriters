
import React from 'react';
import { connect } from 'react-redux';
import { FriendshipRequesterConnected } from './FriendshipRequester'
import { OwnProfilePage } from '../components/OwnProfilePage';
import { Header } from '../components/Header';
import { GetMessages } from './Messages';
import './Author-Profile.css';

export const checkIfOwnProfile = props => {
    const profile = props.match.params.id;
    if (sessionStorage.getItem("userID") === profile) {
      return <OwnProfilePage author={profile} />;
    } else {
      return <SingleAuthorPageConnected author={profile} />;
    }
  };

export const SingleAuthorPage = props => {
    const username = props.userNameLogin;
    if (localStorage.getItem(username + " accepted by " + props.author, true)) {
      const messagesPublished = JSON.parse(
        localStorage.getItem(props.author + " message")
      );
      return (
        <React.Fragment>
          <Header />
          <WritersView author={props.author} />
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
          <WritersView author={props.author} />
          <FriendshipRequesterConnected author={props.author} />
        </React.Fragment>
      );
    }
  };

const fullname = (first, last) => {
    return first + ' ' + last
}

const writers = JSON.parse(localStorage.getItem('writers'))

export const WritersView = props =>
  (writers &&
    writers
      .filter(profile => {
        return profile.login.uuid === props.author;
      })
      .map(writer => {
        return (
          <div className="writers-profile" key={writer.login.uuid}>
            <img
              src={writer.picture.large}
              alt={fullname(writer.name.first, writer.name.last)}
            />
            <h1>{fullname(writer.name.first, writer.name.last)} </h1>
            <p>Age: {writer.dob.age}</p>
            <p>City: {writer.location.city}</p>
            <p>Country:{writer.nat} </p>
            <p>{writer.email}</p>
          </div>
        );
      })) ||
  null;

export default {
    checkIfOwnProfile,
    WritersView
}

const mapStateToProps = state => ({
    userNameLogin: state.userNameLogin
  });

const SingleAuthorPageConnected = connect(mapStateToProps)(SingleAuthorPage)