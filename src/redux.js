/*eslint-disable */
import { createStore, combineReducers } from 'redux';

//Reducers
const loginReducer = (state={}, action) => {
    switch (action.type) {
      case 'LOGIN':
        return true
      case 'LOGOUT':
        return false
    }
    return state
  }

  const activeUserReducer = (state={}, action) => {
    switch (action.type) {
      case 'ACTIVE_USER':
        return action.value
    }
    return state
  }

  const userNameLoginReducer = (state={}, action) => {
    switch (action.type) {
      case 'GET_USER_NAME':
        return action.value
    }
    return state
  }

  const passwordLoginReducer = (state={}, action) => {
    switch (action.type) {
      case 'GET_PASSWORD':
        return action.value
    }
    return state
  }

  const newMessageReducer = (state={}, action) => {
    switch (action.type) {
      case 'NEW_MESSAGE':
        return action.value
    }
    return state
  }

const reducers = (combineReducers({
    logged: loginReducer,
    activeUser: activeUserReducer,
    userNameLogin: userNameLoginReducer,
    passwordLogin: passwordLoginReducer,
    newMessage: newMessageReducer
  }))

//State
 let initialState = {
    logged: sessionStorage.getItem('logged'),
    activeUser: localStorage.getItem('userID'),
    userNameLogin:localStorage.getItem('activeUser'),
    passwordLogin:[]
  }

//Store
export const store = createStore(reducers, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  
  store.subscribe (() => {
    sessionStorage.setItem('logged', store.getState().logged ),
    localStorage.setItem('activeUser', store.getState().userNameLogin ),
    localStorage.setItem('userID', store.getState().activeUser)
  })
  
//Dispatchers
export const userLogin = () => store.dispatch({
    type: 'LOGIN'
  })

export const activeUser = (user) => store.dispatch({
  type: 'ACTIVE_USER',
  value: user
})

export const userLogout = () => {
  window.location.href='/login'
  store.dispatch({
    type: 'LOGOUT'
  })
}

export const getUserName = (username) => store.dispatch({
  type: 'GET_USER_NAME',
  value: username
})

export const getPassword = (password) => store.dispatch({
  type: 'GET_PASSWORD',
  value: password
})

export const getNewMessage = (msg) => store.dispatch({
  type: 'NEW_MESSAGE',
  value: msg
})


 export default store