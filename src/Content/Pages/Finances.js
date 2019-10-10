import React from 'react'
import Budget from './Budget'
import {Redirect, Link} from 'react-router-dom'
import axios from 'axios'
import SERVER_URL from '../../constants'
import Charts from './Chart'

class Finance extends React.Component {
    constructor(props){
        super(props)  
        this.state = {
            stuff: {},
            update: false,
            total: 0,
            categories: ['groceries', 'bills',  'personal', 'debt/savings', 'entertainment', 'other'],
            groceries: [],
            bills: [],
            personal: [],
            debt: [],
            entertainment: [],
            other: []
        }
    }

    componentDidMount() {
        console.log('getting the stuff')
        axios.get(`${SERVER_URL}/budget/${this.props.user._id}`)
        .then(response => {
            console.log('got the stuff')
            this.setState({stuff: response.data.finance})
        })
        .catch(err => {
            console.log('something went wrong')
        })
    }

    componentDidUpdate() {
        if (!this.state.update) {
                let total = 0
                this.state.stuff.incidentals.forEach(element => {
                    total += element.amount
                    console.log('did something')
                })
                this.state.stuff.monthlies.forEach(element => {
                    total += element.amount
                    console.log('did something again')
                })
                let groceries = this.state.stuff.incidentals.filter(incidental => incidental.category=='groceries')
                let totalgroceries = groceries.reduce((accumulator, grocery) => {return accumulator + grocery.amount},0)
                let bills = this.state.stuff.incidentals.filter(incidental => incidental.category=='bills')
                let totalbills = bills.reduce((accumulator, bill) => {return accumulator + bill.amount},0)
                let personal = this.state.stuff.incidentals.filter(incidental => incidental.category=='personal')
                let totalpersonal = personal.reduce((accumulator, personal) => {return accumulator + personal.amount},0)
                let debt = this.state.stuff.incidentals.filter(incidental => incidental.category=='debt/savings')
                let totaldebt = debt.reduce((accumulator, debt) => {return accumulator + debt.amount},0)
                let entertainment = this.state.stuff.incidentals.filter(incidental => incidental.category=='entertainment')
                let totalentertainment = entertainment.reduce((accumulator, entertainment) => {return accumulator + entertainment.amount},0)
                let other = this.state.stuff.incidentals.filter(incidental => incidental.category=='other')
                let totalother = other.reduce((accumulator, other) => {return accumulator + other.amount},0)
                 this.setState({total: total, groceries: totalgroceries, bills: totalbills, personal: totalpersonal, debt: totaldebt, entertainment: totalentertainment, other: totalother})
                 this.setState({update: true})
            }
            
            console.log(this.state)
        }
    

    onClick = () => {
        return <Redirect to='/budget' />
    }

    render (){ 



        return(
            <div>

            

                <h1>Your Finances at a Glance</h1>
                <Charts
                groceries={this.state.groceries}
                other={this.state.other}
                entertainment={this.state.entertainment}
                debt={this.state.debt}
                personal={this.state.personal}
                bills={this.state.bills}
                />
                <hr />

                <h3>Monthly Income:</h3>
                <p>${this.state.stuff.salary/13}</p>

                <h3>Monthly Expenses:</h3>
                <p>{this.state.total}</p>

                <h3>Monthly Savings:</h3>
                <p>{this.state.stuff.savings}</p>

                <button>Update Your Finances</button>

                <Link to="/budget"><button>This Month's Finances</button></Link>

                
            </div>
        )
    }
}

export default Finance