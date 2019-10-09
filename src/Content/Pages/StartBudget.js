import React from 'react'
import Monthlies from './Monthlies'

class StartBudget extends React.Component {
    state = {
        salary: null,
        isSalaried: true,
        freelance: null,
        isFreelance: false,
        rent: 0,
        mortgage: 0,
        isMortgage: false,
        isRent: true,
        savings: 0,
        monthlies: [],
        name: '',
        amount: 0
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    changeIncome = e => {
        if (e.target.value === 'Freelance') {
            this.setState({isSalaried: false, isFreelance: true})
        } else if (e.target.value === 'Salaried') {
            this.setState({isFreelance: false, isSalaried: true})
        }
    }

    changeHousing = e => {
        if (e.target.value === 'mortgage') {
            this.setState({isRent: false, isMortgage: true})
        } else if (e.target.value === 'rent'){
            this.setState({isRent: true, isMortgage: false})
        }
    }

    addInput = e => {
        e.preventDefault()
        console.log(this.state.monthlies)
        let temp = []
        let object = {
            name: this.state.name,
            amount: this.state.amount
        }
        temp = [...this.state.monthlies]
        temp.push(object)
        this.setState({monthlies: temp, name: '', amount: 0})
    }

    handleSubmit = e => {
        e.preventDefault()
    }



    render() {
        let income = <div></div>
        let housing = <div></div>
        let monthlies = this.state.monthlies.map((m,i) => {
            return <Monthlies 
            key={i}
            monthly={m}
            />
        })
        if (this.state.isSalaried) {
            income = (<><label>Salary</label>
            <input name="salary" onChange={this.handleChange} /></>)
        } else {
            income = (<><label>Monthly Estimate:</label>
            <input name="freelance" onChange={this.handleChange} /></>)
        }

        if (this.state.isRent) {
            housing = (<><label>Rent:</label>
                <input name="rent" onChange={this.handleChange} /></>)
        } else {
            housing = (<><label>Mortgage:</label>
                <input name="mortgage" onChange={this.handleChange} /></>)
        }


        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="radio" name="salOrFree" value="Salaried" onChange={this.changeIncome} />Salaried
                    <input type="radio" name="salOrFree" value="Freelance" onChange={this.changeIncome} />Freelance
                    <br />
                    {income}
                    <br />
                    <label>Savings:</label>
                    <input name="savings" onChange={this.handleChange} />
                    <br/>
                    <input type="radio" name="rentOrMort" value="rent" onChange={this.changeHousing} />Rent
                    <input type="radio" name="rentOrMort" value="mortgage" onChange={this.changeHousing} />Mortgage
                    <br />
                    {housing}
                    <br/>
                    <label>Other Monthly Expenses</label>
                    <br />
                    <ul>
                        {monthlies}
                    </ul>
                    <br/>
                    <label>Name of Monthly Expense: </label>
                    <input name="name" value={this.state.name} onChange={this.handleChange} />
                    <br />
                    <label>Amount: </label>
                    <input name="amount" value={this.state.amount} onChange={this.handleChange} />
                    <br />
                    <button onClick={this.addInput}>Add!</button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default StartBudget