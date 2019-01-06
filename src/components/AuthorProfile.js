/*eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { OwnProfilePage } from '../components/OwnProfilePage';
import { Header } from '../components/Header';
import { GetMessages } from './Messages';
import './Author-Profile.css';
import { folloWButtonStatus } from '../redux';

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
                    <FriendshipRequesterConnected author={props.author}/>
                </React.Fragment>
                )   
        }   
    }

const FriendshipRequester = ({...props}) => {

    let buttonStatus = !props.folloWButtonStatus

    const getFriendshipRequest = () => {
        const userRequesting = sessionStorage.getItem('activeUser')
        const userRequested = props.author
        let userPendingRequests =[]
        props.changeButtonStatus()
        
        if (localStorage.getItem(userRequested + ' requested by ')){
            userPendingRequests = JSON.parse(localStorage.getItem(userRequested + ' requested by '))
            
            // Check if user already send a friendship request before to not duplicate it
            if (userPendingRequests.indexOf(userRequesting) >= 0 ) {
                props.newNotification('Ya has solicitado seguir a este usuario antes')
                return
            } else {
                userPendingRequests.push(userRequesting)
            }
        } else {
            userPendingRequests.push(userRequesting)
        }
        
        localStorage.setItem(userRequested + ' requested by ', JSON.stringify(userPendingRequests))
        props.newNotification('solicitud de amistad enviada')
    }
    return(
        <div>
            <button className={buttonStatus ? 'follow-button' : 'hidden'} onClick={() => { getFriendshipRequest (props.author)}} >Follow Author</button>
            <p className="notifications">{props.notifications}</p>
        </div>
    )
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



export default {
    checkIfOwnProfile,
    WritersView
}

const mapStateToProps = state => ({
    notifications: state.newNotification,
    folloWButtonStatus: state.followButtonStatus
})

const mapDispatchToProps = dispatch => {
    return {
        newNotification: (msg) => {
            dispatch({
                type: 'NEW_NOTIFICATION',
                value: msg
            })
        },
        changeButtonStatus: () => {
            dispatch({
                type: 'DISABLE_BUTTON',
            })
        }
    }
}

const FriendshipRequesterConnected = connect(mapStateToProps, mapDispatchToProps)(FriendshipRequester)