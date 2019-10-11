import React from 'react'
import axios from 'axios'
import SERVER_URL from '../../constants'
import Categories from './Categories'
import Incidentals from './Incidentals'
import {Redirect} from 'react-router-dom'


class Budget extends React.Component {

    state = {
        name: '',
        redirect: false,
        amount: 0,
        incidentals: [],
        category: "groceries",
        resultObj: {},
        categories: ['groceries', 'bills',  'personal', 'debt/savings', 'entertainment', 'other']
    }

    // componentDidMount() {
    //     axios.get(`${SERVER_URL}/budget/${this.props.user._id}`)
    //     .then(result => {
    //         this.setState({resultObj: result})
    //     })
    // }
    
    handleSubmit = (e) => {
        e.preventDefault()
        console.log('clicked')
        axios.put(`${SERVER_URL}/budget/${this.props.user._id}`, this.state.incidentals)
        .then(response => {
            this.setState({resultObj: response, redirect: true, incidentals: []})
        })
    }

    storeInput = e => {
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.value)
    }

    handleSelect = e => {
        console.log(e.target.value)
        this.setState({category: e.target.value})
    }

    addToIncidentals = e => {
        let tempArr = [...this.state.incidentals]
        let object = {
            name: this.state.name,
            amount: this.state.amount,
            category: this.state.category
        }
        tempArr.push(object)
        this.setState({incidentals: [...tempArr]})
        this.setState({category: "housing", name: '', amount: 0})
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to="/finance" />
        }
        let categories = this.state.categories.map((c,i) => {
            return <Categories category={c} />
        })

        let incidentals = this.state.incidentals.map((incid,i) => {
            return <Incidentals incid={incid} />
        })

        return (
            <div>
                {/* <h3>Rent:</h3>
                {rents} */}
                <ul>
                    {incidentals}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label>Name of Charge</label>
                    <input name="name" value={this.state.name} onChange={this.storeInput} />
                    <label>Amount of Charge</label>
                    <input name="amount" value={this.state.amount} onChange={this.storeInput} />
                    <label>Category:</label>
                    <select value={this.state.category} onChange={this.handleSelect}>
                        {categories}
                        
                    </select>
                    <button type="button" onClick={this.addToIncidentals}>➕</button>
                    <br />
                    <input type="submit" value="Update Incidentals" />
                </form>
            </div>
        )
    }
}

export default Budget