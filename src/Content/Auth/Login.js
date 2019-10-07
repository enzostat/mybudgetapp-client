import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import SERVER_URL from '../../Constants'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        message: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('Submit', this.state)
        axios.post(`${SERVER_URL}/auth/login`, this.state)
        .then(response => {
            console.log('Success', response)
            //store token in localStorage
            localStorage.setItem('mernToken', response.data.token)

            //update app with user info
            this.props.updateUser()
        })
        .catch(err => {
            console.log(err.response.data)
            this.setState({message: `${err.response.status}: ${err.response.data.message}`})
        })
    }


    render() {
        if(this.props.user) {
            return <Redirect to='/profile' />
        }
        return (
            <div>
                <h2>Login</h2>
                <span className="red">{this.state.message}</span>
                <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>Email:</label>
                            <input name="email" placeholder="Your E-mail Address" onChange={e => this.setState({email: e.target.value, message: ''})} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" placeholder="Your Password" onChange={e => this.setState({password: e.target.value, message: ''})} />
                        </div>
                        <button type="submit" >Log In</button>
                    </form>
            </div>
        )
    }
}

export default Login