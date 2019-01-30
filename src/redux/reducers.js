/*eslint-disable */
import { combineReducers } from "redux";

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
      case "CLEAN_NOTIFICATIONS":
        return '';
    }
    return state;
  };
  
  const buttonStatusReducer = (state = {}, action) => {
    switch (action.type) {
      case "DISABLE_BUTTON":
        return true;
      case "ENABLE_BUTTON":
        return false;
    }
    return state;
  };
  
  const saveWritersReducer = (state = {}, action) => {
    switch (action.type) {
      case "SAVE_WRITERS":
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
  
  export const reducers = combineReducers({
    logged: loginReducer,
    loginError: loginErrorReducer,
    activeUser: activeUserReducer,
    userNameLogin: userNameLoginReducer,
    passwordLogin: passwordLoginReducer,
    newMessage: newMessageReducer,
    allMessages: allMessagesReducer,
    newNotification: newNotificationReducer,
    buttonStatus: buttonStatusReducer,
    saveWriters: saveWritersReducer,
    friendshipRequests: getFriendshipRequestsReducer,
    friendshipApprovals: getFriendshipApprovalsReducer
  });