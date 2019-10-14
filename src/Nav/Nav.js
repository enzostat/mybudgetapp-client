import React from 'react'
import {Link} from 'react-router-dom'

class Nav extends React.Component {

    handleLogout = (e) => {
        e.preventDefault()
        //remove the token from localStorage (or cookies)
        localStorage.removeItem('mernToken')
        //update the state of the app
        this.props.updateUser()
    }
    render() {
        let links = '';

        //if user is logged in, show profile page and log out links
        if (this.props.user) {
            links = (
                <span>
                {/* <li>
                    <Link to="/profile">Profile</Link>
                </li> */}
                <li>
                <a href="/" onClick={this.handleLogout}>Logout</a>
                </li>
                <li>
                    <Link to="/finance">Finances</Link>
                </li>
                </span>
                
            )
        } else {
            links = (
                <span>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                 <li>
                 <Link to="/signup">Sign up</Link>
                </li>
                </span>
            )
        }
        return (
            <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    
                    {links}
                </ul>
            </nav>
        )
    }
}

export default Nav