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

const postNotificationFriendshipApproved = (request, approve) => {
    const requestsContainer = document.querySelector(`[data-name=${request}]`)
    const button = document.querySelectorAll(`[data-button=${request}]`)
    button.forEach(btn => {
        btn.classList.add('hidden')
    }) 
    if(approve){
        requestsContainer.innerHTML = '¡Has aceptado la solicitud!'
    } else {
        requestsContainer.innerHTML = 'Has rechazado la solicitud... :('
    }
}

const getApproveRequestData = (request, author, approve ) => {

    //Get all requests from localStorage into an Array
    const allRequests = JSON.parse(localStorage.getItem(author + ' requested by ' ))

    //find the index of the user requesting friendship
    const index = allRequests.findIndex( item => item === request )

    //Eliminate only the user approved/rejected from the array
    allRequests.splice(index, 1)

    //Set a new Array in localStorage
    localStorage.setItem( author + ' requested by ', JSON.stringify(allRequests) )
    
    if (approve) {
        localStorage.setItem( request + ' accepted by ' + author, true )
        postNotificationFriendshipApproved(request, approve)
    } else {
        postNotificationFriendshipApproved(request)
    }
}

const ViewRequests = ({requests, author}) => 
requests&&
    requests.map(request => {
        return(
            <div key={request} className="requests-container" >
                <h2>Hola {sessionStorage.getItem('activeUser')} </h2>
                <p className="requestNotification" data-name={request} >Tienes una solicitud de amistad de: <span>{request} </span> </p>
                <button key="accept-button" data-button={request} onClick={() => getApproveRequestData(request, author, 'approve')} >Aprobar</button>
                <button key="reject-button" data-button={request} onClick={() => getApproveRequestData(request, author)}>Rechazar</button>
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
