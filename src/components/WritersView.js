import React from 'react';
import { connect } from 'react-redux';

export const fullname = (first, last) => {
    return first + ' ' + last
}

//Single writer profile card
const WritersView = ({...props}) =>
  (props.writers &&
    props.writers
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

  const mapStateToProps = state => ({
    writers: state.saveWriters
  });
  

  export const WritersViewConnected = connect(mapStateToProps)(WritersView)