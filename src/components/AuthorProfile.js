/*eslint-disable */
import React from 'react';
import { store, SendRequest, ApproveRequest } from '../redux';
import { Provider, connect } from 'react-redux';
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
export default checkIfOwnProfile

class OwnProfilePage extends React.Component {
    state={}

    componentDidMount() {
        const pendingRequests = localStorage.getItem(authorID() + ' requested by ')
        this.setState({pendingRequests})
    }

    getMessage = (e) => {
        this.setState({newMessage: e.target.value})
    }

    publishMessage = (e) => {
        e.preventDefault()
        let allMessages = []
        if (localStorage.getItem(localStorage.getItem('userID')+' message')){
            allMessages = JSON.parse(localStorage.getItem(localStorage.getItem('userID')+' message'))
            allMessages.push(this.state.newMessage)
        }else {
            allMessages.push(this.state.newMessage)
        }    
        localStorage.setItem(localStorage.getItem('userID')+' message', JSON.stringify(allMessages) )
        const getForm = document.querySelector('.confirmation-message')
        getForm.innerHTML = '¡¡Mensaje publicado con éxito!!'
    }

    render(){
        return(
            <React.Fragment>
                <Header/>
                <div className="own-profile-container">
                    <Provider store={store}>
                        <AutorProfile />
                    </Provider>
                        <ViewRequests requests={this.state.pendingRequests}/>
                        <form onSubmit={this.publishMessage} >
                            <div className="message-form">
                                <h3>¡Publica un nuevo mensaje!</h3>
                                <textarea rows="4" cols="130" maxLength="150" defaultValue="Hasta 150 caraceteres" onChange={this.getMessage} ></textarea>
                                <br></br>
                                <button >Publicar</button> 
                                <div className="confirmation-message"></div>
                            </div>
                        </form>
                </div>
            </React.Fragment>
        )
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
                <AutorProfile />
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
                <AutorProfile />
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

const postNotificationFriendshipApproved = () => {
    const requestsContainer = document.querySelector('.requestNotification')
    requestsContainer.innerHTML = '¡Has aceptado la solicitud!'
    const button = document.querySelector('.request-button')
    button.classList.add('hidden')
}

const getFriendshipRequest = () => {
    const userRequesting = localStorage.getItem('activeUser')
    const userRequested = authorID()
    const friendship = {
        from: userRequesting,
        to: userRequested 
    }
    localStorage.setItem(userRequested + ' requested by ', userRequesting )
    postNotificationRequestSended()
    SendRequest(friendship)
}

const getApproveRequestData = () => {
    const userApproving = localStorage.getItem('userID')
    const userAccepted = localStorage.getItem(authorID() + ' requested by ')
    const FriendShipApproval = {
            from: userApproving,
            to: userAccepted
    }
    localStorage.setItem(userAccepted + ' accepted by ' + userApproving, true)
    postNotificationFriendshipApproved()
    localStorage.removeItem(authorID() + ' requested by ')
    ApproveRequest(FriendShipApproval)
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

const ViewRequests = ({requests}) => 
    requests&&
    <div className="requests-container" >
        <h2>Hola {localStorage.getItem('activeUser')} </h2>
        <p className="requestNotification" >tienes una solicitud de amistad de: <span>{requests} </span> </p>
        <button className="request-button" onClick={getApproveRequestData}>Aprobar</button>
    </div>
        || null

const mapStateToProps = state => ({
    writers: state.writers
})

const AutorProfile = connect (mapStateToProps)(WritersView)