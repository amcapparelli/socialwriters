/*eslint-disable */
import React from 'react';
import { LoginPage } from './App';
import { checkIfOwnProfile } from './components/AuthorProfile';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { Header } from './components/Header'
import './Main.css';

const Routes = () => {

   return(
       <BrowserRouter>
    <div>
        <Route exact path="/" component={ Home } ></Route>
        <Route path="/login" component={ LoginPage }></Route>
        <Route path="/author/:id" component={ Profiles } />
    </div>
       </BrowserRouter>
   ) 
}

export default Routes

const authentication = () => sessionStorage.getItem('logged') == 'true' ? true : false

const LoginWarning = () => 
    <div className="login-warning">
        <p>Debes iniciar sesión antes de ver este contenido</p>
        <Link to="/login">Iniciar Sesión</Link>
    </div>

const Home = () => authentication() ? <Usersview/> : <LoginWarning/>
const Profiles = (props) => authentication() ? checkIfOwnProfile(props) : <LoginWarning/>

    
const Usersview = () => {        
        return(
            <div>
                <Header/>
                <ul className="writers-view">
                    <WritersView  />
                </ul> 
            </div>
        )
    }

const writers = JSON.parse(localStorage.getItem('writers'))

const WritersView = () =>
writers&& 
writers.map(writer => {
    return(
        <li key={writer.name.last}>
            <img src={writer.picture.large} ></img>
            <h3>{writer.name.first}</h3>
            <p>{writer.email}</p>
            <Link to={`/author/${writer.login.uuid}`} >View Profile</Link>
        </li>
        )
    })
    || null
        