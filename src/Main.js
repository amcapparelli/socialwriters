/*eslint-disable */
import React from 'react';
import { LoginPage } from './App';
import { SingleAuthorPage } from './components/AuthorProfile';
import { fetchWriters, store } from './redux';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { LogoutButton } from './utils/logout-button';
import './Main.css';

const Routes = () => {
   return(
       <BrowserRouter>
    <div>
        <Route exact path="/" component={Home} ></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/author" component={SingleAuthorPage} />
    </div>
    </BrowserRouter>
   ) 
}

export default Routes

const Home = () => {
    if (localStorage.getItem('logged') === 'true') {
        return(
            <Usersview/>
        ) 
    } else {
        return (
            <div>
            <p>debe hacer login antes de ver este contenido</p>
                <Link to="/login">Login</Link>
            </div>
        )
    }
}

class Usersview extends React.Component {
    
    componentDidMount () {
        fetch('https://randomuser.me/api/?results=10&seed=xxx')
        .then(response => response.json())
        .then(usersFromApi => fetchWriters(usersFromApi.results) 
        )
        .catch(error => console.log('Hubo un error', error))
    }
      render() {
        
        return(
            <div>
                <LogoutButton className={this.props.className} /> 
                <Provider store={store}>
                <ul>
                    <WritersConnected className="writers-view" />
                </ul> 
                </Provider>
            </div>
        )
    }
}

const WritersView = ({writers}) =>
writers&& 
writers.map(writer => {
    return(
        <li key={writer.name.last}>
            <img src={writer.picture.large} ></img>
            <h3>{writer.name.first}</h3>
            <p>{writer.email}</p>
            <Link to={`/author/${writer.login.uuid}`} >View Profile</Link>
        </li>
        )
    })
    || null
        
const mapStateToProps = state => ({
    writers: state.writers
})

const WritersConnected = connect(mapStateToProps)(WritersView)


