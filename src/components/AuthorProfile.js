/*eslint-disable */
import React from 'react';
import { OwnProfilePage } from '../components/OwnProfilePage';
import { Header } from '../components/Header';
import { GetMessages } from './Messages';
import './Author-Profile.css';

export const checkIfOwnProfile = ( props ) => {
    const profile = props.match.params.id
    if (sessionStorage.getItem('userID') === profile){
        return <OwnProfilePage author={profile}/>
    } else {
        return <SingleAuthorPage author={profile}/>
    }
}

export const SingleAuthorPage = (props) => {
    
        const username = sessionStorage.getItem('activeUser')
        if (localStorage.getItem(username + ' accepted by ' + props.author, true)){
            const messagesPublished = JSON.parse(localStorage.getItem(props.author +' message'))
            return(
                <React.Fragment>
                    <Header/>
                    <WritersView author={props.author} />
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
                    <WritersView author={props.author} />
                    <FollowButton author={props.author}/>
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

const getFriendshipRequest = (author) => {
    const userRequesting = sessionStorage.getItem('activeUser')
    const userRequested = author
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

export const WritersView = (props) =>
writers&& 
writers.filter(profile => {
   return profile.login.uuid === props.author
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

const FollowButton = (props) => <button className="follow-button" onClick={() => { getFriendshipRequest (props.author)}} >Follow Author</button>

export default {
    checkIfOwnProfile,
    WritersView
}