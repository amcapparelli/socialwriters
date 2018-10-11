import React from 'react';
import { userLogin, activeUser, store, getUserName, getPassword } from './redux';
import { Provider, connect } from 'react-redux';
import fetchUsers from './utils/fetchUsers';

export class LoginPage extends React.Component {
  
  componentDidMount () {
    fetchUsers()
  }
  
  render() {
    return (
      <Provider store={store}>
        <LoginFormView />
      </Provider>
    );
  }
}

const LoginForm = ({writers, userName, userPassword}) => {
  const changeUserName = (e) => getUserName(e.target.value)
  const changePassword = (e) => getPassword(e.target.value)

  const Validate = () => 
    writers&&
    writers.filter(user => 
      user.login.username === userName &&
      user.login.password === userPassword)

  const submit = (e) => {
    e.preventDefault()
    console.log(Validate().length)
    if (Validate().length === 1) {
      userLogin()
      activeUser( Validate()[0].login.uuid )
      window.location.href='/'
    } else {
      document.querySelector('.error-message').innerHTML = 'Ese usuario no existe o la contraseña es incorrecta'
    } 
  }
  return (
     <form onSubmit={submit} className="login-form" >
        <label>UserName: </label> 
        <input type="text" onChange={changeUserName} ></input> 
        <label>Password: </label>
        <input type="password" onChange={changePassword}  ></input>
        <button type="submit" >Login</button>
        <div className="error-message"></div>
    </form>
  )
}

export default LoginPage 

const mapStateToProps = state => ({
  writers: state.writers,
  userName: state.userNameLogin,
  userPassword: state.passwordLogin
})

const LoginFormView = connect(mapStateToProps)(LoginForm)

