import React from 'react';
import { connect } from 'react-redux';
import { OwnProfilePageConnected } from '../views/OwnProfilePage';
import { SingleAuthorPageConnected } from '../views/AuthorProfile'

export const CheckIfOwnProfile = ({...props}) => {
    const profile = props.profile.match.params.id;
    if (props.activeUser === profile) {
      return <OwnProfilePageConnected author={profile} />;
    } else {
      return <SingleAuthorPageConnected author={profile} />;
    }
  };

  const mapStateToProps = state => ({
    activeUser: state.activeUser
  });
  
  
  export const CheckIfOwnProfileConnected = connect(
    mapStateToProps
  )(CheckIfOwnProfile);