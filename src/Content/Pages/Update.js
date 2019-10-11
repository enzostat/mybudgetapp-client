import React from 'react'
import Categories from './Categories'
import Monthlies from './Monthlies'

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
            incidentals: [],
            category: 'groceries',
            categories: ['groceries', 'bills',  'personal', 'debt/savings', 'entertainment', 'other']
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log('clicked')
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
                    <input name="salary" onChange={this.handleChange} value={this.props.budget.salary} />
                    <input name="rent" onChange={this.handleChange} value={this.props.budget.salary} />
                    <input name="savings" onChange={this.handleChange} value={this.props.budget.salary} />
                    <br />
                    <br/>
                    {monthlies}
                    <br/>
                    <br/>
                    <input onChange={this.handleChange} name="name" />
                    <input onChange={this.handleChange} type="number" name="amount" />
                    <select value={this.state.category} onChange={this.handleCategory}>
                        {categories}
                    </select>
                    <button type="button" onClick={this.addObj}>➕</button>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Update