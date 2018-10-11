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
  
  const fetchReducer = (state=[], action) => {
    switch (action.type) {
      case 'FETCH':
      return state.writers = action.value
    }
    return state
  }

  const requestReducer = (state={}, action) => {
    switch (action.type) {
      case 'FRIEND_REQUEST':
      return state.friendsRequest = action.value
    }
    return state
  }

  const activeUserReducer = (state={}, action) => {
    switch (action.type) {
      case 'ACTIVE_USER':
      return  action.value
    }
    return state
  }

  const ApproveRequestReducer = (state={}, action) => {
    switch (action.type) {
      case 'APPROVE_REQUEST':
      return  action.value
    }
    return state
  }

  const userNameLoginReducer = (state={}, action) => {
    switch (action.type) {
      case 'GET_USER_NAME':
      return  action.value
    }
    return state
  }

  const passwordLoginReducer = (state={}, action) => {
    switch (action.type) {
      case 'GET_PASSWORD':
      return  action.value
    }
    return state
  }

const reducers = (combineReducers({
    logged: loginReducer,
    writers: fetchReducer,
    activeUser: activeUserReducer,
    friendsRequest: requestReducer,
    ApproveRequest: ApproveRequestReducer,
    userNameLogin: userNameLoginReducer,
    passwordLogin: passwordLoginReducer
  }))

//State
 let initialState = {
    logged: localStorage.getItem('logged'),
    writers:[],
    activeUser: localStorage.getItem('userID'),
    friendsRequest:{},
    userNameLogin:localStorage.getItem('activeUser'),
    passwordLogin:[]
  }

//Store
export const store = createStore(reducers, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  
  store.subscribe (() => {
    localStorage.setItem('logged', store.getState().logged ),
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

export const fetchWriters = (writers) => store.dispatch({
  type: 'FETCH',
  value: writers
})

export const SendRequest = (request) => store.dispatch({
  type: 'FRIEND_REQUEST',
  value: request
})

export const ApproveRequest = (request) => store.dispatch({
  type: 'APPROVE_REQUEST',
  value: request
})

export const getUserName = (username) => store.dispatch({
  type: 'GET_USER_NAME',
  value: username
})

export const getPassword = (password) => store.dispatch({
  type: 'GET_PASSWORD',
  value: password
})

 export default {
      userLogin, 
      userLogout,
      store,
      fetchWriters,
      SendRequest,
      ApproveRequest
  } 