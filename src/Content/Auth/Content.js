import React from 'react'
import {Route} from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import Login from './Login'
import Signup from './Signup'
import Finance from '../Pages/Finances'
import Budget from '../Pages/Budget'
import StartBudget from '../Pages/StartBudget'
import Update from '../Pages/Update'

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
            <Route path="/finance" render={
                () => <Finance user={props.user} budget={props.budget} updateUser={props.updateUser} />
            } />
            <Route path="/budget" render={
                ()=> <Budget user={props.user} budget={props.budget} updateUser={props.updateUser} />
            } />
            <Route path="/startbudget" render={
                () => <StartBudget user={props.user} updateUser={props.updateUser} />
            } />
            <Route path="/update" render={
                ()=> <Update user={props.user} budget={props.budget} updateUser={props.updateUser} />
            } />
        </div>
    )
}

export default Content