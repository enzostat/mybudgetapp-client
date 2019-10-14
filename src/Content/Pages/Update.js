import React from 'react'
import Categories from './Categories'
import Monthlies from './Monthlies'
import axios from 'axios'
import SERVER_URL from '../../constants'
import {Redirect} from 'react-router-dom'

class Update extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            monthlies: [],
            salary: 0,
            rent: 0,
            savings: 0,
            name: '',
            amount: 0,
            redirect: false,
            incidentals: [],
            category: 'groceries',
            categories: ['groceries', 'bills',  'personal', 'debt/savings', 'entertainment', 'other']
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        let token = localStorage.getItem('mernToken')
        console.log('clicked')
        axios.put(`${SERVER_URL}/budget/update/${this.props.user._id}`, this.state, {
            headers: {'Authorization': `Bearer ${token}`}
          })
        .then(response => {
            console.log('success', response)
            this.setState({redirect: true})
        })
        .catch(err => {
            console.log(err)
        })

    }

    handleChange = e => {
        console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    handleCategory = e => {
        this.setState({category: e.target.value})
        console.log(e.target.value)
    }

    addObj = () => {
        let obj = {}
        let tempArr = []
        tempArr = [...this.state.monthlies]
        obj = {
            name: this.state.name,
            amount: this.state.amount,
            category: this.state.category
        }
        tempArr.push(obj)
        this.setState({monthlies: tempArr, name: '', amount: 0, category: 'groceries'})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/finance" />
        }
        let categories = this.state.categories.map((c,i) => {
            return <Categories category={c} />
        })
        let monthlies = this.state.monthlies.map((m,i) => {
            return <Monthlies 
            key={i}
            monthly={m}
            />
        })

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Salary:</label>
                    <input name="salary" onChange={this.handleChange} value={this.props.budget.salary} />
                    <br />
                    <label>Rent/Mortgage</label>
                    <input name="rent" onChange={this.handleChange} value={this.props.budget.salary} />
                    <br/>
                    <label>Savings: </label>
                    <input name="savings" onChange={this.handleChange} value={this.props.budget.salary} />
                    <br />
                    <label>Monthly Expenditures: </label>
                    <br/>
                    {monthlies}
                    <br/>
                    <br/>
                    <label>Name of Monthly Expense: </label>
                    <input onChange={this.handleChange} name="name" value={this.state.name} />
                    <label>Amount: </label>
                    <input onChange={this.handleChange} type="number" name="amount" value={this.state.amount} />
                    <label>Category: </label>
                    <select value={this.state.category} onChange={this.handleCategory}>
                        {categories}
                    </select>
                    <button type="button" onClick={this.addObj}>➕</button>
                    <input className="button" type="submit" />
                </form>
            </div>
        )
    }
}

export default Update