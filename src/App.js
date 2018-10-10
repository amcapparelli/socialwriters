import React from 'react';
import styled from 'styled-components';
import { userLogin, activeUser } from './redux'


export class LoginPage extends React.Component {
  constructor () {
    super()
    this.state = {
      username: 'username',
      password: 'password',
      userRandom:[]
    }
  }

  componentDidMount () {
    this.fetchUser()
  }
  
  fetchUser () {
    fetch('https://randomuser.me/api/?seed=xxx')
    .then(response => response.json())
    .then(jsonresults => jsonresults.results.map(users => ({
        username:`${users.login.username}`,
        password: `${users.login.password}`
    })))
    .then(userRandom => this.setState({ 
      userRandom
    }))
    .catch(error => console.log('Hubo un error', error))
  }

  validate = () => {
    return (this.state.username === this.state.userRandom[0].username &&
    this.state.password === this.state.userRandom[0].password)
  }

  submit = (e) => {
    e.preventDefault()
    if (this.validate()) {
      userLogin()
      activeUser(this.state.username)
      const {history} = this.props
      history.push('/')
    } else {
      document.querySelector('.error-message').innerHTML = 'Datos incorrectos'
    } 
  }

  changeUserName = (e) => {
    this.setState({username: e.target.value})
  }

  changePassword = (e) => {
    this.setState({password: e.target.value})
  }

  render() {
    return (
      <LoginForm>
        <form onSubmit={this.submit} >
          <label>UserName: </label> 
            <input type="text" onChange={this.changeUserName} ></input> 
          <label>Password: </label>
            <input type="password" onChange={this.changePassword}  ></input>
          <button type="submit" >Login</button>
        </form>
        <div className="error-message"></div>
      </LoginForm>
    );
  }
}

const LoginForm = styled.label `   
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export default LoginPage
