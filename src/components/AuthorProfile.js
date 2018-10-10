/*eslint-disable */
import React from 'react';
import { store, SendRequest, ApproveRequest, activeUser } from '../redux';
import { Provider, connect } from 'react-redux';
import { LogoutButton } from '../utils/logout-button';
import './Author-Profile.css';

export const checkIfOwnProfile = () => {
    if (localStorage.getItem('activeUser') === AuthorID()){
        return <p>Own Profile</p>
    } else {
        return <SingleAuthorPage/>
    }
}
export default checkIfOwnProfile

class SingleAuthorPage extends React.Component {
    state={}

    componentDidMount() {
        const pendingRequests = localStorage.getItem(AuthorID())
        this.setState({pendingRequests})
    }

    approveRequest() {
        console.log('entra')
    }

    render(){
        return(
            <React.Fragment>
                <LogoutButton/>
            <Provider store={store}>
                <AutorProfile />
            </Provider>
            <ViewRequests requests={this.state.pendingRequests}/>
        </React.Fragment>
        )
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
    const userApproving = AuthorID()
    const userAccepted = localStorage.getItem('activeUser')
    const FriendShipApproval = {
        from: userApproving,
        to: userAccepted
    }
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
                <button className="follow-button" onClick={getFriendshipRequest} >Follow Author</button>
        </div>
        )
    })
    || null


const ViewRequests = ({requests}) => 
    requests&&
    <div className="requests-container" >
        <p>tienes una solicitud de amistad de: <span>{requests} </span> </p>
        <button onClick={getApproveRequestData}>Aprobar</button>
    </div>
        || null
    
const mapStateToProps = state => ({
    writers: state.writers
})

const AutorProfile = connect (mapStateToProps)(WritersView)