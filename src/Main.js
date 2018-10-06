/*eslint-disable */
import React from 'react';
import {LoginPage} from './App';
import {BrowserRouter, Link, Route} from 'react-router-dom';

const Routes = () => {
   return(
       <BrowserRouter>
    <div>
        <Route exact path="/" component={Home} ></Route>
        <Route path="/login" component={LoginPage}></Route>
    </div>
    </BrowserRouter>
   ) 
}

export default Routes

const Home = () => {
    if (localStorage.getItem('logged') === 'true') {
        return(
        <h1>Hola</h1>
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

