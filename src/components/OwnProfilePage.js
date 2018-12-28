import React from 'react';
import { Header } from '../components/Header';
import { store } from '../redux';
import { Provider, connect } from 'react-redux';
import { WritersView } from './AuthorProfile';


export const OwnProfilePage = (props) => {

    const requests = JSON.parse(localStorage.getItem(props.author + ' requested by '))
    
        return(
            <React.Fragment>
                <Header/>
                <div className="own-profile-container">
                    <WritersView author={props.author}/>
                    <ViewRequests requests={requests} author={props.author}/>
                    <Provider store={store}>
                        <FormMessagesConnected />
                    </Provider>
                </div>
            </React.Fragment>
        )
    }


const FormMessages = ({ ...props }) => {

    const getNewMessage = (e) => props.getMessage(e.target.value)

    function publishMessage (e) {
        e.preventDefault()
        let allMessages = []
        if (localStorage.getItem(sessionStorage.getItem('userID')+' message')){
            allMessages = JSON.parse(localStorage.getItem(sessionStorage.getItem('userID')+' message'))
            allMessages.push(props.newMessage)
        }else {
            allMessages.push(props.newMessage)
        }    
        localStorage.setItem(sessionStorage.getItem('userID')+' message', JSON.stringify(allMessages))
        const textarea = document.querySelector('.textarea')
        textarea.value= ''
        const getForm = document.querySelector('.confirmation-message')
        getForm.innerHTML = '¡¡Mensaje publicado con éxito!!'
    }

    return(
        <form onSubmit={publishMessage} >
            <div className="message-form">
                <h3>¡Publica un nuevo mensaje!</h3>
                <textarea rows="4" cols="130" maxLength="150" className="textarea" defaultValue="Hasta 150 caraceteres" onChange={getNewMessage} ></textarea>
                <br></br>
                <button >Publicar</button> 
                <div className="confirmation-message"></div>
            </div>
        </form>
    )
}

const postNotificationFriendshipApproved = (request) => {
    const requestsContainer = document.querySelector(`[data-name=${request}]`)
    requestsContainer.innerHTML = '¡Has aceptado la solicitud!'
    const button = document.querySelector(`[data-button=${request}]`)
    button.classList.add('hidden')
}

const getApproveRequestData = (request, author) => {
    const userApproving = sessionStorage.getItem('userID')
    const userAccepted = request
    
    localStorage.setItem(userAccepted + ' accepted by ' + userApproving, true)
    postNotificationFriendshipApproved(request)
    localStorage.removeItem(author + ' requested by ')
    
}

const ViewRequests = ({requests, author}) => 
requests&&
    requests.map(request => {
        return(
            <div className="requests-container" >
                <h2>Hola {sessionStorage.getItem('activeUser')} </h2>
                <p className="requestNotification" data-name={request} >tienes una solicitud de amistad de: <span>{request} </span> </p>
                <button className="request-button" data-button={request} onClick={() => getApproveRequestData(request, author)} >Aprobar</button>
            </div>
        )
     }) || null
    

export default OwnProfilePage

const mapStateToProps = state => ({
    newMessage: state.newMessage
  })

const mapDispatchToProps = dispatch => {
    return {
        getMessage: (msg) => {
            dispatch({
                type: 'NEW_MESSAGE',
                value: msg
            })
        }
    }
}

const FormMessagesConnected = connect(mapStateToProps, mapDispatchToProps)(FormMessages)
