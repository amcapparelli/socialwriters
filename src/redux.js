/*eslint-disable */
import { createStore, combineReducers } from 'redux';

const rootReducer = (state={}, action) => {
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

  const reducers = (combineReducers({
    logged: rootReducer,
    writers: fetchReducer
  }))

 let initialState = {
    logged: localStorage.getItem('logged'),
    writers:[]
  }

  export const store = createStore(reducers, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  
  store.subscribe (() => {
    localStorage.setItem('logged', store.getState().logged )
  })
  

export const userLogin = () => store.dispatch({
    type: 'LOGIN'
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

 export default {
      userLogin, 
      userLogout,
      store,
      fetchWriters
  } 