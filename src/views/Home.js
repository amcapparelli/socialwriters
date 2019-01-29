import React from "react";
import { connect } from "react-redux";
import { Header } from '../components/Header';
import { LoginWarning } from '../components/LoginWarning';
import { AllWritersViewConnected } from '../components/AllWritersView';

const Home = ({...props}) => {
    const userlogged = props.logged 
    return userlogged === 'true' ? <HomeView /> : <LoginWarning />
}

const HomeView = (props) => {
  return (
    <div>
      <Header props={props} />
      <ul className="writers-view">
        <AllWritersViewConnected />
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
    logged: state.logged
})

export const HomeConnected = connect(mapStateToProps)(Home)