import React from 'react';
import { authorID } from '../utils/checkAuthorId';
import { Header } from '../components/Header';
import { store, ApproveRequest } from '../redux';
import { Provider } from 'react-redux';
import { AuthorProfile } from './AuthorProfile';


export class OwnProfilePage extends React.Component {
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
        localStorage.setItem(localStorage.getItem('userID')+' message', JSON.stringify(allMessages))
        const textarea = document.querySelector('.textarea')
        textarea.value= ''
        const getForm = document.querySelector('.confirmation-message')
        getForm.innerHTML = '¡¡Mensaje publicado con éxito!!'
    }

    render(){
        return(
            <React.Fragment>
                <Header/>
                <div className="own-profile-container">
                    <Provider store={store}>
                        <AuthorProfile />
                    </Provider>
                        <ViewRequests requests={this.state.pendingRequests}/>
                        <form onSubmit={this.publishMessage} >
                            <div className="message-form">
                                <h3>¡Publica un nuevo mensaje!</h3>
                                <textarea rows="4" cols="130" maxLength="150" className="textarea" defaultValue="Hasta 150 caraceteres" onChange={this.getMessage} ></textarea>
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

const postNotificationFriendshipApproved = () => {
    const requestsContainer = document.querySelector('.requestNotification')
    requestsContainer.innerHTML = '¡Has aceptado la solicitud!'
    const button = document.querySelector('.request-button')
    button.classList.add('hidden')
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

const ViewRequests = ({requests}) => 
    requests&&
    <div className="requests-container" >
        <h2>Hola {localStorage.getItem('activeUser')} </h2>
        <p className="requestNotification" >tienes una solicitud de amistad de: <span>{requests} </span> </p>
        <button className="request-button" onClick={getApproveRequestData}>Aprobar</button>
    </div>
        || null

export default OwnProfilePage