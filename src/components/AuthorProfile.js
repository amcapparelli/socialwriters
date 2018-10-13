/*eslint-disable */
import React from 'react';
import { store, SendRequest } from '../redux';
import { Provider, connect } from 'react-redux';
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

class SingleAuthorPage extends React.Component  {
    state={}
    componentDidMount () {
        this.checkFriendship()
        const messagesPublished = JSON.parse(localStorage.getItem(authorID() +' message'))
        this.setState({messagesPublished})
    }
    checkFriendship = () => {
        const username = localStorage.getItem('activeUser')
        if (localStorage.getItem(username + ' accepted by ' + authorID()  , true)){
            this.setState({friends: true})
        } else {
            this.setState({friends: false})
        }   
    }
    render() {
        if(this.state.friends){
            return(
            <React.Fragment>
                <Header/>
            <Provider store={store}>
                <AuthorProfile />
            </Provider>
            <div className="messages-container">
                <ul >
                    <h2>Mensajes: </h2>
                    <GetMessages  messages={this.state.messagesPublished}/>
                </ul>
                </div>
            </React.Fragment>
        )
        } else {
            return (
            <React.Fragment>
                <Header/>
            <Provider store={store}>
                <AuthorProfile />
            </Provider>
                <FollowButton/>
                <div className="notifications"></div>
            </React.Fragment>
            )     
        } 
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
    const friendship = {
        from: userRequesting,
        to: userRequested 
    }
    localStorage.setItem(userRequested + ' requested by ', JSON.stringify(userPendingRequests) )
    postNotificationRequestSended()
    SendRequest(friendship)
}

const fullname = (first, last) => {
    return first + ' ' + last
}

const WritersView = ({writers}) =>
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

const mapStateToProps = state => ({
    writers: state.writers
})

export const AuthorProfile = connect (mapStateToProps)(WritersView)

export default {
    checkIfOwnProfile,
    AuthorProfile
}