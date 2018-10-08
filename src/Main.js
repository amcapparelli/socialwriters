/*eslint-disable */
import React from 'react';
import {LoginPage} from './App';
import {AuthorProfile} from './AuthorProfile'
import {BrowserRouter, Link, Route} from 'react-router-dom';
import './Main.css'

const Routes = () => {
   return(
       <BrowserRouter>
    <div>
        <Route exact path="/" component={Home} ></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/author" component={AuthorProfile}></Route>
    </div>
    </BrowserRouter>
   ) 
}

export default Routes

const Home = () => {
    if (localStorage.getItem('logged') === 'true') {
        return(
            <Usersview/>
        ) 
    } else {
        return (
            <div>
            <p>debe hacer login antes de ver este contenido</p>
                <Link to="/login">Login</Link>
            </div>
        )
    }
}

class Usersview extends React.Component {
    state = {
        usersDB: []
    }
    componentDidMount () {
        fetch('https://randomuser.me/api/?results=10&seed=xxx')
        .then(response => response.json())
        .then(usersFromApi => this.setState({
            usersDB: usersFromApi
        }))
        .catch(error => console.log('Hubo un error', error))
    }
      render() {
        const {usersDB} = this.state
        const usersResults = usersDB.results 
        
        return(
            <ul>
                <WritersView users={usersResults} className="writers-view" />
            </ul>
        )
    }
}

const WritersView = ({users}) =>
    users&& 
    users.map(writer => {
    return(
        <li key={writer.name.last}>
            <img src={writer.picture.medium} ></img>
            <h3>{writer.name.first}</h3>
            <p>{writer.email}</p>
            <Link to={`/author/${writer.login.uuid}`}>View Profile</Link>
        </li>
        )
    })
    || null
        
    



