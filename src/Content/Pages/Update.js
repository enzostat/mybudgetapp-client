import React from 'react'

class Update extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            monthlies: [],
            salary: 0,
            rent: 0,
            savings: 0,
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
    }

    render() {
        let categories = this.state.categories.map((c,i) => {
            return <Categories category={c} />
        })
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="salary" onChange={this.handleChange} value={this.props.budget.salary} />
                    <input name="rent" onChange={this.handleChange} value={this.props.budget.salary} />
                    <input name="savings" onChange={this.handleChange} value={this.props.budget.salary} />
                    <br />
                    <br/>
                    <input name="name" />
                    <input name="amount" />
                    <select onChange={handleCategory}>
                        {categories}
                    </select>
                </form>
            </div>
        )
    }
}

export default Update