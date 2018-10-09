import React from 'react';
import styled from 'styled-components';
import { userLogin } from './redux'


export class LoginPage extends React.Component {
  constructor () {
    super()
    this.state = {
      user: 'name',
      email: 'email',
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
        name:`${users.name.first} ${users.name.last}`,
        email: `${users.email}`
    })))
    .then(userRandom => this.setState({ 
      userRandom
    }))
    .catch(error => console.log('Hubo un error', error))
  }

  validate = () => {
    return (this.state.user === this.state.userRandom[0].name &&
    this.state.email === this.state.userRandom[0].email)
  }

  submit = (e) => {
    e.preventDefault()
    if (this.validate()) {
      userLogin()
      const {history} = this.props
      history.push('/')
    } else {
      document.querySelector('.error-message').innerHTML = 'Datos incorrectos'
    } 
  }

  changeName = (e) => {
    this.setState({user: e.target.value})
  }

  changeEmail = (e) => {
    this.setState({email: e.target.value})
  }

  render() {
    return (
      <LoginForm>
        <form onSubmit={this.submit} >
          <label>Nombre: </label> 
            <input type="text" onChange={this.changeName} ></input> 
          <label>Email: </label>
            <input type="email" onChange={this.changeEmail}  ></input>
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
