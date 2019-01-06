/*eslint-disable */
import { createStore, combineReducers } from "redux";

//Reducers
const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
  }
  return state;
};

const loginErrorReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return action.value;
  }
  return state;
};

const activeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "ACTIVE_USER":
      return action.value;
    case "REMOVE_ACTIVE_USER":
      return "";
  }
  return state;
};

const userNameLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_NAME":
      return action.value;
    case "REMOVE_ACTIVE_USER":
      return "";
  }
  return state;
};

const passwordLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_PASSWORD":
      return action.value;
  }
  return state;
};

const newMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      return action.value;
  }
  return state;
};

const newNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.value;
  }
  return state;
};

const buttonStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case "DISABLE_BUTTON":
      return true;
  }
  return state;
};

const reducers = combineReducers({
  logged: loginReducer,
  loginError: loginErrorReducer,
  activeUser: activeUserReducer,
  userNameLogin: userNameLoginReducer,
  passwordLogin: passwordLoginReducer,
  newMessage: newMessageReducer,
  newNotification: newNotificationReducer,
  buttonStatus: buttonStatusReducer
});

//State
let initialState = {
  logged: sessionStorage.getItem("logged"),
  loginError: false,
  activeUser: sessionStorage.getItem("userID"),
  userNameLogin: sessionStorage.getItem("activeUser"),
  passwordLogin: [],
  newNotification: "",
  buttonStatus: false
};

//Store
export const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  sessionStorage.setItem("logged", store.getState().logged),
    sessionStorage.setItem("activeUser", store.getState().userNameLogin),
    sessionStorage.setItem("userID", store.getState().activeUser);
});

//Dispatchers
export const userLogin = () =>
  store.dispatch({
    type: "LOGIN"
  });

export const loginError = msg =>
  store.dispatch({
    type: "LOGIN_ERROR",
    value: msg
  });

export const activeUser = user =>
  store.dispatch({
    type: "ACTIVE_USER",
    value: user
  });

export const removeActiveUser = () =>
  store.dispatch({
    type: "REMOVE_ACTIVE_USER"
  });

export const userLogout = () => {
  store.dispatch({
    type: "LOGOUT"
  });
};

export const getUserName = username =>
  store.dispatch({
    type: "GET_USER_NAME",
    value: username
  });

export const getPassword = password =>
  store.dispatch({
    type: "GET_PASSWORD",
    value: password
  });

export const getNewMessage = msg =>
  store.dispatch({
    type: "NEW_MESSAGE",
    value: msg
  });

export const newNotification = msg =>
  store.dispatch({
    type: "NEW_NOTIFICATION",
    value: msg
  });

export const buttonStatus = () =>
  store.dispatch({
    type: "DISABLE_BUTTON"
  });

export default store;