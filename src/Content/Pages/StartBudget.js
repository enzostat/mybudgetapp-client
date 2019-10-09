import React from 'react'

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
        monthlies: []
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
            name: e.target.name,
            amount: e.target.amount
        }
        temp = [...this.state.monthlies]
        temp.push(object)
        this.setState({monthlies: temp})
    }



    render() {
        let income = <div></div>
        let housing = <div></div>
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
                <form>
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
                    <input name="name" placeholder="name of monthly expense" />
                    <input name="amount" placeholder="amount" />
                    <button onClick={this.addInput}>+</button>
                    <br />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default StartBudget