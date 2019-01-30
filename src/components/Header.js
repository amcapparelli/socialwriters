import React from "react";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import "./Header.css";

export const Header = ({...props}) => (
  <header>
    <h1>
      <a href="/">Social Writers</a>
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
  };
  return (
      <button onClick={logout} className="logout-button">
        logout
      </button>
  );
};

const mapStateToProps = state => ({
  logged: state.logged
});

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
    }
  };
};

const ButtonConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LogoutButton));