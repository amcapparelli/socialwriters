/*eslint-disable */
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import { initialState } from './initialState';


//Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  sessionStorage.setItem("logged", store.getState().logged),
    sessionStorage.setItem("activeUser", store.getState().userNameLogin),
    sessionStorage.setItem("userID", store.getState().activeUser),
    localStorage.setItem(
      "writers",
      JSON.stringify(store.getState().saveWriters)
    ),
    localStorage.setItem(
      "FriendshipRequests",
      JSON.stringify(store.getState().friendshipRequests)
    ),
    localStorage.setItem(
      "FriendshipApprovals",
      JSON.stringify(store.getState().friendshipApprovals)
    ),
    localStorage.setItem(
      "Messages",
      JSON.stringify(store.getState().allMessages)
    );
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

export const saveWriters = writers =>
  store.dispatch({
    type: "SAVE_WRITERS",
    value: writers
  });

export const getWriters = url => {
  return function(dispatch) {
    return fetch(url)
      .then(response => response.json())
      .then(usersFromApi => dispatch(saveWriters(usersFromApi.results)))
      .catch(error => console.log("Hubo un error", error));
  };
};

export const login = () => {
  return function(dispatch) {
    const writers = store.getState().saveWriters;
    const user = writers.filter(
      user =>
        user.login.username === store.getState().userNameLogin &&
        user.login.password === store.getState().passwordLogin
    );
    if (user.length === 0) {
      return dispatch(
        loginError("Ese usuario no existe o la contraseña es incorrecta")
      );
    } else {
      window.location.href = "/"
      return dispatch(activeUser(user[0].login.uuid), userLogin());
    }
  };
};

export const getFriendshipRequests = obj =>
  store.dispatch({
    type: "ADD_REQUEST",
    value: obj
  });

export const getFriendshipApprovals = obj =>
  store.dispatch({
    type: "ADD_APPROVAL",
    value: obj
  });

export default store;