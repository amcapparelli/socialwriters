import React from "react";
import "./Header.css";
import { connect } from "react-redux";

export const Header = (props) => (
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
    window.location.href = "/login";
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
)(LogoutButton);