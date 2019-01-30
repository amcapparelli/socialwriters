import React from "react";
import { connect } from "react-redux";
import {  withRouter, Link } from "react-router-dom";
import "./Header.css";

export const Header = () => (
  <header>
    <h1>
      <Link to='/'>
        Social Writers
      </Link>
    </h1>
    <span>A Social Network for Writers</span>
    <ButtonConnected />
  </header>
);

export default Header;

const LogoutButton = ({ ...props }) => {
  const logout = () => {
    props.history.push("/login");
    props.userlogout();
    props.removeActiveUser();
    props.cleanNotifications();
    props.buttonStatusEnable();
  };
  return (
      <button onClick={logout} className="logout-button">
        logout
      </button>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    userlogout: () => {
      dispatch({
        type: "LOGOUT"
      });
    },
    removeActiveUser: () => {
      dispatch({
        type: "REMOVE_ACTIVE_USER"
      });
    },
    cleanNotifications: () => {
      dispatch({
        type: "CLEAN_NOTIFICATIONS"
      })
    },
    buttonStatusEnable: () => {
      dispatch({
        type: "ENABLE_BUTTON"
      })
    }
  };
};

const ButtonConnected = connect(
  null,
  mapDispatchToProps
)(withRouter(LogoutButton));