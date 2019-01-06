import React from 'react';
import { connect } from 'react-redux';
import fetchUsers from './utils/fetchUsers';

export class LoginPage extends React.Component {
  
  componentDidMount () {
    fetchUsers()
  }
  
  render() {
    return <LoginFormView />
  }
}

const LoginForm = ({ ...props }) => {
  const changeUserName = (e) => props.getUserName(e.target.value)
  const changePassword = (e) => props.getPassword(e.target.value)
  const writers = JSON.parse(localStorage.getItem('writers'))
  const error = props.loginErrorStatus

  const Validate = () => 
    writers&&
    writers.filter(user => 
      user.login.username === props.userName &&
      user.login.password === props.userPassword)

  function submit (e) {
    e.preventDefault()
    if (Validate().length === 1) {
      props.userLogin()
      props.activeUser( Validate()[0].login.uuid )
      window.location.href='/'
    } else {
      props.loginError('Ese usuario no existe o la contraseña es incorrecta') 
    } 
  }
  return (
     <form onSubmit={submit} className="login-form" >
        <label>UserName: </label> 
        <input type="text" onChange={changeUserName} ></input> 
        <label>Password: </label>
        <input type="password" onChange={changePassword}  ></input>
        <button type="submit" >Login</button>
        {
          error && 
            <div className="error-message">
              {error} 
            </div>
        }
    </form>
  )
}

export default LoginPage 

const mapStateToProps = state => ({
  userName: state.userNameLogin,
  userPassword: state.passwordLogin,
  loginErrorStatus: state.loginError
})

const mapDispatchToProps = dispatch => {
  return {
    getUserName: (username) => {
      dispatch({
        type: 'GET_USER_NAME',
        value: username
      })
    },
    getPassword: (password) => {
      dispatch({
        type: 'GET_PASSWORD',
        value: password
      })
    },
    userLogin: () => {
      dispatch({
        type: 'LOGIN'
      })
    },
    loginError: (msg) => {
      dispatch({
        type: 'LOGIN_ERROR',
        value: msg
      })
    },
    activeUser: (userId) => {
      dispatch({
        type: 'ACTIVE_USER',
        value: userId
      })
    }
  }
}

const LoginFormView = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

