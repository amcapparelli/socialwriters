/*eslint-disable */
import React from 'react';
import {store} from './redux';
import {Provider, connect} from 'react-redux';

export const SingleAuthorPage = () => 
        <Provider store={store}>
          <AutorProfile/>
        </Provider>

     
export default SingleAuthorPage

const AuthorID = () => {
    const url = window.location.pathname
    const autorId = url.substring(url.lastIndexOf('/')+1);
    return autorId
}

const WritersView = ({writers}) =>
writers&& 
writers.filter(profile => {
   return profile.login.uuid === AuthorID()
})
.map(writer => {
    return(
        <li key={writer.name.last}>
            <img src={writer.picture.large} ></img>
            <h1>{writer.name.first}</h1>
            <p>{writer.email}</p>
            <button>Follow Author</button>
        </li>
        )
    })
    || null


const mapStateToProps = state => ({
    writers: state.writers
})

const AutorProfile = connect (mapStateToProps)(WritersView)