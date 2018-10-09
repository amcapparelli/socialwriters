/*eslint-disable */
import { createStore } from 'redux';

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
      return {logged: state.logged = true }
      case 'LOGOUT':
      return {logged: state.logged = false}
    }
    return state
  }
  
  export const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  
  store.subscribe (() => {
    localStorage.setItem('logged', store.getState().logged )
  })
  
  const initialState = {
    logged: localStorage.getItem('logged'),
    writers:[]
  }
  
export const userLogin = () => store.dispatch({
    type: 'LOGIN'
  })
  
export const userLogout = () => {
  window.location.href='/login'
  store.dispatch({
    type: 'LOGOUT'
  })
}


 export default {
      userLogin, 
      userLogout,
      store
  } 