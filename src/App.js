import React from 'react';
import './App.css';
import Header from './Nav/Header';
import Nav from './Nav/Nav';
import{BrowserRouter as Router} from 'react-router-dom'
import Content from './Content/Auth/Content'
import SERVER_URL from './constants'
import axios from 'axios'

class App extends React.Component {

  state = {
    user: null,
    budget: {}
  }

  componentDidMount () {
    //Go look for a token
    this.getUser()
    this.getBudget()

  }

  getBudget = () => {
    if (this.state.user != null) {
      axios.get(`${SERVER_URL}/budget/${this.state.user._id}`)
      .then(result => {
        this.setState({budget: result})
      })
    }
  }

  getUser = () => {
    //see if there is a token
    let token = localStorage.getItem('mernToken')

    //if there is a token, try to use it to get user info
    if(token) {
      console.log('token was', token)
      axios.get(`${SERVER_URL}/auth/current/user`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then(response => {
        console.log('success', response)
        this.setState({user: response.data.user})
      })
      .catch(err => {
        console.log(err)
      })

    } else {
      this.setState({user: null})
    }
  }
  
  render(){
    return (
      <Router>
      <div className="App">
        <Nav user={this.state.user} updateUser={this.getUser} />
        {/* <Header /> */}
        <Content updateUser={this.getUser} user={this.state.user} budget={this.state.budget} />
        
      </div>
      </Router>
    );
  }
}

export default App;
