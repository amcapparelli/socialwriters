import React from "react";
import { connect } from 'react-redux';
import { LoginPage } from "./App";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { fullname } from './components/WritersView'
import "./Main.css";
import { CheckIfOwnProfileConnected } from "./components/CheckIfOwnProfile";

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/author/:id" component={Profiles} />
      </div>
    </BrowserRouter>
  );
};

export default Routes;

const authentication = () =>
  sessionStorage.getItem("logged") === "true" ? true : false;

const LoginWarning = () => (
  <div className="login-warning">
    <p>Debes iniciar sesión antes de ver este contenido</p>
    <Link to="/login">Iniciar Sesión</Link>
  </div>
);

const Home = () => (authentication() ? <Usersview /> : <LoginWarning />);
const Profiles = props =>
  authentication() ? <CheckIfOwnProfileConnected profile={props} /> : <LoginWarning />;

const Usersview = () => {
  return (
    <div>
      <Header />
      <ul className="writers-view">
        <AllWritersViewConnected />
      </ul>
    </div>
  );
};

//All writers cards at home page
const AllWritersView = ({...props}) =>
  (props.writers &&
    props.writers.map(writer => {
      return (
        <li key={writer.name.last}>
          <img 
            src={writer.picture.large}
            alt={fullname(writer.name.first, writer.name.last)} 
          />
          <h3>{writer.name.first}</h3>
          <p>{writer.email}</p>
          <Link to={`/author/${writer.login.uuid}`}>View Profile</Link>
        </li>
      );
    })) ||
  null;

  const mapStateToProps = state => ({
    writers: state.saveWriters
  });
  

  export const AllWritersViewConnected = connect(mapStateToProps)(AllWritersView)