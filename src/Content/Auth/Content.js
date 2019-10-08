import React from 'react'
import {Route} from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import Login from './Login'
import Signup from './Signup'
import Finance from '../Pages/Finances'

const Content = props => {
    return(
        <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/profile" render={
               () => <Profile user={props.user} />
                } />
            <Route path="/signup" render={
                ()=> <Signup user={props.user} updateUser={props.updateUser} /> 
                } />
            <Route path="/login" render={
                () => <Login user={props.user} updateUser={props.updateUser} />
                } />
            <Route path="/finance" component={Finance} />
        </div>
    )
}

export default Content