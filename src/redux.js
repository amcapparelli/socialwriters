/*eslint-disable */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

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

const allMessagesReducer = (state = {}, action ) => {
  switch (action.type){
    case "ALL_MESSAGES":
      return action.value
  }
    return state
}

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

const getWritersReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_WRITERS":
      return action.value;
  }
  return state;
};

const getFriendshipRequestsReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_REQUEST":
      return action.value
  }
  return state;
};

const getFriendshipApprovalsReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_APPROVAL":
      return action.value
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
  allMessages: allMessagesReducer,
  newNotification: newNotificationReducer,
  buttonStatus: buttonStatusReducer,
  getWriters: getWritersReducer,
  friendshipRequests: getFriendshipRequestsReducer,
  friendshipApprovals: getFriendshipApprovalsReducer
});

//State
let initialState = {
  logged: sessionStorage.getItem("logged"),
  loginError: false,
  activeUser: sessionStorage.getItem("userID"),
  userNameLogin: sessionStorage.getItem("activeUser"),
  passwordLogin: [],
  newNotification: "",
  buttonStatus: false,
  getWriters: JSON.parse(localStorage.getItem("writers")),
  friendshipRequests: JSON.parse(localStorage.getItem("FriendshipRequests")) || {},
  friendshipApprovals: JSON.parse(localStorage.getItem("FriendshipApprovals")) || {},
  allMessages: JSON.parse(localStorage.getItem("Messages")) || {}
};

//Store

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  sessionStorage.setItem("logged", store.getState().logged),
  sessionStorage.setItem("activeUser", store.getState().userNameLogin),
  sessionStorage.setItem("userID", store.getState().activeUser),
  localStorage.setItem("FriendshipRequests", JSON.stringify(store.getState().friendshipRequests)),
  localStorage.setItem("FriendshipApprovals", JSON.stringify(store.getState().friendshipApprovals)),
  localStorage.setItem("Messages", JSON.stringify(store.getState().allMessages))
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

export const getAllMessages = obj =>
  store.dispatch({
    type: "ALL_MESSAGES",
    value: obj
  })

export const newNotification = msg =>
  store.dispatch({
    type: "NEW_NOTIFICATION",
    value: msg
  });

export const buttonStatus = () =>
  store.dispatch({
    type: "DISABLE_BUTTON"
  });

export const getWriters = (writers) =>
  store.dispatch({
    type: "GET_WRITERS",
    value: writers
});

export const getFriendshipRequests = (obj) =>
  store.dispatch({
    type: "ADD_REQUEST",
    value: obj
});

export const getFriendshipApprovals = (obj) =>
  store.dispatch({
    type: "ADD_APPROVAL",
    value: obj
});

export default store;