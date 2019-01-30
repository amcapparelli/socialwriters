import React from "react";
import { connect } from "react-redux";
import { LoginFormView } from "./views/Login";
import { HomeConnected } from "./views/Home";
import { LoginWarning } from "./components/LoginWarning";
import { CheckIfOwnProfileConnected } from "./components/CheckIfOwnProfile";
import { BrowserRouter, Route } from "react-router-dom";
import "./Main.css";

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={HomeConnected} />
        <Route path="/login" component={LoginFormView} />
        <Route path="/author/:id" component={ProfilesConnected} />
      </div>
    </BrowserRouter>
  );
};

const Profiles = ({ ...props }) => {
  const userlogged = props.logged;
  return userlogged === true ? <CheckIfOwnProfileConnected profile={props} />
                               : <LoginWarning />;
};

const mapStateToProps = state => ({
  logged: state.logged
});

const ProfilesConnected = connect(mapStateToProps)(Profiles);

export default Routes;