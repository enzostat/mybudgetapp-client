import React from 'react'

class Update extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            monthlies: [],
            salary: 0,
            rent: 0,
            savings: 0,
            incidentals: []
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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="salary" onChange={this.handleChange} value={this.props.budget.salary} />
                    <input name="rent" onChange={this.handleChange} value={this.props.budget.salary} />
                    <input name="savings" onChange={this.handleChange} value={this.props.budget.salary} />
                </form>
            </div>
        )
    }
}

export default Update