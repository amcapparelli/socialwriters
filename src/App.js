/*eslint-disable */
import React, { Component } from 'react';
import { createStore } from 'redux';
import styled from 'styled-components';


//Reducers 
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
    return {logged: state.logged = true }
    case 'LOGGOUT':
    return {logged: state.logged = false }
  }
  return state
}

const store = createStore(rootReducer)

store.subscribe (() => {
  console.log('store updated', store.getState())
  localStorage.setItem('logged', store.getState().logged )
})

const initialState = {
  logged: false
}

//Actions
const userLogin = () => store.dispatch({
  type: 'LOGIN'
})

const userLoggout = () => store.dispatch({
  type: 'LOGGOUT'
})

class LoginPage extends React.Component {
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
    this.validate() ? userLogin() : document.querySelector('.error-message').innerHTML = 'Datos incorrectos'
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
      <button onClick={userLoggout} >loggout</button>
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

export default LoginPage;
