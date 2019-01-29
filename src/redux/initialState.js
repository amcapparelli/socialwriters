
//Initial State
export let initialState = {
    logged: sessionStorage.getItem("logged"),
    loginError: false,
    activeUser: sessionStorage.getItem("userID"),
    userNameLogin: sessionStorage.getItem("activeUser"),
    passwordLogin: [],
    newNotification: "",
    buttonStatus: false,
    saveWriters: JSON.parse(localStorage.getItem("writers")),
    friendshipRequests:
      JSON.parse(localStorage.getItem("FriendshipRequests")) || {},
    friendshipApprovals:
      JSON.parse(localStorage.getItem("FriendshipApprovals")) || {},
    allMessages: JSON.parse(localStorage.getItem("Messages")) || {}
  };