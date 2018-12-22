/*eslint-disable */
import React from 'react';
import { OwnProfilePage } from '../components/OwnProfilePage';
import { Header } from '../components/Header';
import { authorID } from '../utils/checkAuthorId';
import { GetMessages } from './Messages';
import './Author-Profile.css';

export const checkIfOwnProfile = () => {
    if (localStorage.getItem('userID') === authorID()){
        return <OwnProfilePage/>
    } else {
        return <SingleAuthorPage/>
    }
}

export const SingleAuthorPage = () => {
    
        const username = localStorage.getItem('activeUser')
        if (localStorage.getItem(username + ' accepted by ' + authorID()  , true)){
            const messagesPublished = JSON.parse(localStorage.getItem(authorID() +' message'))
            return(
                <React.Fragment>
                    <Header/>
                    <WritersView />
                <div className="messages-container">
                    <ul >
                        <h2>Mensajes: </h2>
                        <GetMessages  messages={messagesPublished}/>
                    </ul>
                </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Header/>
                    <WritersView />
                    <FollowButton/>
                    <div className="notifications"></div>
                </React.Fragment>
                )   
        }   
    }

const postNotificationRequestSended = () => {
    const button = document.querySelector('.follow-button')
    button.classList.add('hidden')
    const notification = document.querySelector('.notifications')
    notification.innerHTML = 'Solicitud de amistad enviada'
}

const getFriendshipRequest = () => {
    const userRequesting = localStorage.getItem('activeUser')
    const userRequested = authorID()
    let userPendingRequests =[]
    if (localStorage.getItem(userRequested + ' requested by ')){
        userPendingRequests = JSON.parse(localStorage.getItem(userRequested + ' requested by ')) 
        userPendingRequests.push(userRequesting)
    } else {
        userPendingRequests.push(userRequesting)
    }
    
    localStorage.setItem(userRequested + ' requested by ', JSON.stringify(userPendingRequests))
    postNotificationRequestSended()
}

const fullname = (first, last) => {
    return first + ' ' + last
}

const writers = JSON.parse(localStorage.getItem('writers'))

export const WritersView = () =>
writers&& 
writers.filter(profile => {
   return profile.login.uuid === authorID()
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
        </div>
        )
    })
    || null

const FollowButton = () => <button className="follow-button" onClick={getFriendshipRequest} >Follow Author</button>

export default {
    checkIfOwnProfile,
    WritersView
}