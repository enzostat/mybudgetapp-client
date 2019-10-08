import React from 'react'
import Budget from './Budget'
import {Redirect, Link} from 'react-router-dom'

class Finance extends React.Component {
    state = {
        stuff: null
    }

    onClick = () => {
        return <Redirect to='/budget' />
    }

    render (){ 
        return(
            <div>
                <h1>Your Finances at a Glance</h1>

                <hr />

                <h3>Salary:</h3>
                <p>You are unemployed</p>

                <h3>Monthly Expenses:</h3>
                <p>Placeholder</p>

                <h3>Monthly Savings:</h3>
                <p>Placeholder</p>

                <button>Update Your Finances</button>

                <Link to="/budget"><button>This Month's Finances</button></Link>

                
            </div>
        )
    }
}

export default Finance