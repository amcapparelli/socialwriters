import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fullname } from './WritersView'


//All writers cards at home page
const AllWritersView = ({...props}) =>
  (props.writers &&
    props.writers.map(writer => {
      return (
        <li key={writer.name.last}>
          <img 
            src={writer.picture.large}
            alt={fullname(writer.name.first, writer.name.last)} 
          />
          <h3>{writer.name.first}</h3>
          <p>{writer.email}</p>
          <Link to={`/author/${writer.login.uuid}`}>View Profile</Link>
        </li>
      );
    })) ||
  null;

  const mapStateToProps = state => ({
    writers: state.saveWriters
  });
  

 export const AllWritersViewConnected = connect(mapStateToProps)(AllWritersView)