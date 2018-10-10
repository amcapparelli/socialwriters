/*eslint-disable */
import React from 'react';
import { store } from '../redux';
import { Provider, connect } from 'react-redux';
import { LogoutButton } from '../utils/logout-button';
import './Author-Profile.css';

export const SingleAuthorPage = () => 
        <React.Fragment>
                <LogoutButton/>
            <Provider store={store}>
                <AutorProfile />
            </Provider>
        </React.Fragment>

     
export default SingleAuthorPage

const AuthorID = () => {
    const url = window.location.pathname
    const autorId = url.substring(url.lastIndexOf('/')+1);
    return autorId
}

const fullname = (first, last) => {
    return first + ' ' + last
}

const WritersView = ({writers}) =>
writers&& 
writers.filter(profile => {
   return profile.login.uuid === AuthorID()
})
.map(writer => {
    return(
        <div className="writers-profile" key={writer.login.uuid} >
                <img src={writer.picture.large} alt={fullname(writer.name.first, writer.name.last)} ></img>
                <h1>{fullname(writer.name.first, writer.name.last)} </h1>
                <p>Age: {writer.dob.age}</p>
                <p>City: {writer.location.city}</p>
                <p>Country:{writer.nat} </p>
                <p>{writer.email}</p>
                <button className="follow-button" >Follow Author</button>
        </div>
        )
    })
    || null


const mapStateToProps = state => ({
    writers: state.writers
})

const AutorProfile = connect (mapStateToProps)(WritersView)