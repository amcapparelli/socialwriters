/*eslint-disable */
import { createStore } from 'redux';
import React from 'react';
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
    return {logged: state.logged = true }
    case 'LOGOUT':
    return {logged: state.logged = false }
  }
  return state
}

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe (() => {
  localStorage.setItem('logged', store.getState().logged )
  
})

const initialState = {
  logged: localStorage.getItem('logged')
}

const userLogin = () => store.dispatch({
  type: 'LOGIN'
})

const userLogout = () => store.dispatch({
  type: 'LOGOUT'
})

export class LoginPage extends React.Component {
  constructor () {
    super()
    this.state = {
      user: 'name',
      email: 'email',
      userRandom:[]
    }
  }

  componentDidMount () {
    this.fetchUser()
  }
  
  fetchUser () {
    fetch('https://randomuser.me/api/?seed=xxx')
    .then(response => response.json())
    .then(jsonresults => jsonresults.results.map(users => ({
        name:`${users.name.first} ${users.name.last}`,
        email: `${users.email}`
    })))
    .then(userRandom => this.setState({ 
      userRandom
    }))
    .catch(error => console.log('Hubo un error', error))
  }

  validate = () => {
    return (this.state.user === this.state.userRandom[0].name &&
    this.state.email === this.state.userRandom[0].email)
  }

  submit = (e) => {
    e.preventDefault()
    if (this.validate()) {
      userLogin()
      const {history} = this.props
      history.push('/')
    } else {
      document.querySelector('.error-message').innerHTML = 'Datos incorrectos'
    } 
  }

  changeName = (e) => {
    this.setState({user: e.target.value})
  }

  changeEmail = (e) => {
    this.setState({email: e.target.value})
  }

  render() {
    return (
      <React.Fragment>
      <LoginForm>
        <form onSubmit={this.submit} >
          <label>Nombre: </label> 
            <input type="text" value={this.state.user} onChange={this.changeName} ></input> 
          <label>Email: </label>
            <input type="email" onChange={this.changeEmail}  ></input>
          <button type="submit" >Login</button>
        </form>
        <div className="error-message"></div>
      </LoginForm>
      <button onClick={userLogout} >logout</button>
      </React.Fragment>
    );
  }
}

const LoginForm = styled.label `   
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default {
  LoginPage
};
