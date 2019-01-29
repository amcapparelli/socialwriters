import React from "react";
import { connect } from "react-redux";
import { getWriters, login } from "../redux/redux";

const LoginForm = ({ ...props }) => {
  const changeUserName = e => props.getUserName(e.target.value);
  const changePassword = e => props.getPassword(e.target.value);
  props.fetchData("https://randomuser.me/api/?results=10&seed=xxx");
  const error = props.loginErrorStatus; 

  function submit(e) {
    e.preventDefault();
    props.loginSubmit()
  }

  return (
    <form onSubmit={submit} className="login-form">
      <label>UserName: </label>
      <input type="text" onChange={changeUserName} />
      <label>Password: </label>
      <input type="password" onChange={changePassword} />
      <button type="submit">Login</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

const mapStateToProps = state => ({
  logged: state.logged,
  userName: state.userNameLogin,
  userPassword: state.passwordLogin,
  loginErrorStatus: state.loginError,
  writers: state.saveWriters
});

const mapDispatchToProps = dispatch => {
  return {
    getUserName: username => {
      dispatch({
        type: "GET_USER_NAME",
        value: username
      });
    },
    getPassword: password => {
      dispatch({
        type: "GET_PASSWORD",
        value: password
      });
    },
    fetchData: url => {
      dispatch(getWriters(url));
    },
    loginSubmit: () => {
      dispatch(login());
    }
  };
};

export const LoginFormView = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);