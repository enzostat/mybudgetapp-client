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
            groceries: 0,
            bills: 0,
            personal: 0,
            debt: 0,
            entertainment: 0,
            other: 0
        }
    }

    componentDidMount() {
        console.log('getting the stuff')
        let token = localStorage.getItem('mernToken')
        axios.get(`${SERVER_URL}/budget/${this.props.user._id}`, {
            headers: {'Authorization': `Bearer ${token}`}
          })
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
                this.setState({total: total})
                 this.updateChart()
                //  this.setState({total: total, groceries: totalgroceries, bills: totalbills, personal: totalpersonal, debt: totaldebt, entertainment: totalentertainment, other: totalother})
                 this.setState({update: true})
            }
            
            console.log(this.state)
        }
    

    onClick = () => {
        return <Redirect to='/budget' />
    }

    updateChart = () => {
        let incidentalgroceries = this.state.stuff.incidentals.filter(incidental => incidental.category=='groceries')
        let totalincidentalgroceries = incidentalgroceries.reduce((accumulator, grocery) => {return accumulator + grocery.amount},0)
        let groceries = this.state.stuff.monthlies.filter(incidental => incidental.category=='groceries')
        let totalgroceries = groceries.reduce((accumulator,grocery) => {return accumulator + grocery.amount},0)
        totalgroceries += totalincidentalgroceries

        let incidentalbills = this.state.stuff.incidentals.filter(incidental => incidental.category=='bills')
        let totalincidentalbills = incidentalbills.reduce((accumulator, bill) => {return accumulator + bill.amount},0)
        let bills = this.state.stuff.monthlies.filter(incidental => incidental.category=='bills')
        let totalbills = bills.reduce((accumulator,bill) => {return accumulator +bill.amount},0)
        totalbills += totalincidentalbills

        let incidentalpersonal = this.state.stuff.incidentals.filter(incidental => incidental.category=='personal')
        let totalincidentalpersonal = incidentalpersonal.reduce((accumulator, personal) => {return accumulator + personal.amount},0)
        let personal = this.state.stuff.monthlies.filter(incidental => incidental.category=='personal')
        let totalpersonal = personal.reduce((accumulator,personal) => {return accumulator +personal.amount},0)
        totalpersonal += totalincidentalpersonal

        let incidentaldebt = this.state.stuff.incidentals.filter(incidental => incidental.category=='debt/savings')
        let totalincidentaldebt = incidentaldebt.reduce((accumulator, debt) => {return accumulator + debt.amount},0)
        let debt = this.state.stuff.monthlies.filter(incidental => incidental.category=='debt/savings')
        let totaldebt = debt.reduce((accumulator,debt) => {return accumulator +debt.amount},0)
        totaldebt += totalincidentaldebt

        let incidentalentertainment = this.state.stuff.incidentals.filter(incidental => incidental.category=='entertainment')
        let totalincidentalentertainment = incidentalentertainment.reduce((accumulator, entertainment) => {return accumulator + entertainment.amount},0)
        let entertainment = this.state.stuff.monthlies.filter(incidental => incidental.category=='entertainment')
        let totalentertainment = entertainment.reduce((accumulator,entertainment) => {return accumulator +entertainment.amount},0)
        totalentertainment += totalincidentalentertainment

        let incidentalother = this.state.stuff.incidentals.filter(incidental => incidental.category=='other')
        let totalincidentalother = incidentalother.reduce((accumulator, other) => {return accumulator + other.amount},0)
        let other = this.state.stuff.monthlies.filter(incidental => incidental.category=='other')
        let totalother = other.reduce((accumulator,other) => {return accumulator +other.amount},0)
        totalother += totalincidentalother

        this.setState({groceries: totalgroceries, bills: totalbills, personal: totalpersonal, debt: totaldebt, entertainment: totalentertainment, other: totalother})

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

                <Link to="/update"><button>Update Your Finances</button></Link>

                <Link to="/budget"><button>Update Incidentals</button></Link>

                {/* <Link to="/showexpenses"><button>See monthly and incidental expenses</button></Link> */}

                
            </div>
        )
    }
}

export default Finance