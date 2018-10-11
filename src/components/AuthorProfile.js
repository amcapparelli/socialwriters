/*eslint-disable */
import React from 'react';
import { store, SendRequest, ApproveRequest } from '../redux';
import { Provider, connect } from 'react-redux';
import { Header } from '../components/Header';
import './Author-Profile.css';

export const checkIfOwnProfile = () => {
    if (localStorage.getItem('userID') === AuthorID()){
        return <OwnProfilePage/>
    } else {
        return <SingleAuthorPage/>
    }
}
export default checkIfOwnProfile

class OwnProfilePage extends React.Component {
    state={}

    componentDidMount() {
        const pendingRequests = localStorage.getItem(AuthorID())
        this.setState({pendingRequests})
    }

    getMessage = (e) => {
        this.setState({message: e.target.value})
    }

    publishMessage = (e) => {
        e.preventDefault()
        localStorage.setItem(localStorage.getItem('userID')+' message', this.state.message )
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
                            <div className="message-form visible">
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
    }
    checkFriendship = () => {
        if (localStorage.getItem(AuthorID(), localStorage.getItem('activeUser'))){
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
                <GetMessges/>
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
            </React.Fragment>
            )
           
    } 
    }
}

const AuthorID = () => {
    const url = window.location.pathname
    const autorId = url.substring(url.lastIndexOf('/')+1);
    return autorId
}

const getFriendshipRequest = () => {
    const userRequesting = localStorage.getItem('activeUser')
    const userRequested = AuthorID()
    const friendship = {
        from: userRequesting,
        to: userRequested
    }
    localStorage.setItem(userRequested, userRequesting )
    SendRequest(friendship)
}

const getApproveRequestData = () => {
    const userApproving = localStorage.getItem('activeUser')
    const userAccepted = localStorage.getItem(AuthorID())
    const FriendShipApproval = {
            from: userApproving,
            to: userAccepted
    }
    localStorage.setItem(userApproving, userAccepted )
    ApproveRequest(FriendShipApproval)
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
        </div>
        )
    })
    || null

const FollowButton = () => <button className="follow-button" onClick={getFriendshipRequest} >Follow Author</button>

const ViewRequests = ({requests}) => 
    requests&&
    <div className="requests-container" >
        <h2>Hola {localStorage.getItem('activeUser')} </h2>
        <p>tienes una solicitud de amistad de: <span>{requests} </span> </p>
        <button onClick={getApproveRequestData}>Aprobar</button>
    </div>
        || null

const GetMessges = () => {
    const message = localStorage.getItem(AuthorID() + ' message')
    return (
        <div className="messages-container">
            <h2>Mensajes:</h2>
            <p>{message}</p>
        </div>
    ) 
}

const mapStateToProps = state => ({
    writers: state.writers
})

const AutorProfile = connect (mapStateToProps)(WritersView)