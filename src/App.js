/*eslint-disable */
import React, { Component } from 'react';
import { createStore } from 'redux';
import styled from 'styled-components';



const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
    return {logged: state.logged = true }
  }
  return state
}

const store = createStore(rootReducer)

store.subscribe (() => {
  console.log('store updated', store.getState())
})

const initialState = {
  logged: false
}

const userLogin = () => store.dispatch({
  type: 'LOGIN'
})

userLogin()

class SocWri extends Component {
  render() {
    return (
      <LoginForm>
        <label>Nombre: </label> 
          <input type="text"></input> 
        <label>Email: </label>
          <input type="email"></input>
        <button type="submit">Login</button>
      </LoginForm>
    );
  }
}

const LoginForm = styled.label `   
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 1fr;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default SocWri;
