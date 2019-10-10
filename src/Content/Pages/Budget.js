import React from 'react'
import axios from 'axios'
import SERVER_URL from '../../constants'
import Categories from './Categories'
import Incidentals from './Incidentals'


class Budget extends React.Component {

    state = {
        bill: [],
        rent: null,
        mortgage: null,
        utility: [],
        name: '',
        amount: 0,
        incidentals: [],
        category: "housing",
        resultObj: {},
        categories: ['housing', 'transportation', 'groceries', 'utilities', 'clothing', 'medical', 'insurance', 'household items', 'personal', 'debt', 'retirement', 'education', 'savings', 'gifts', 'entertainment', 'other']
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
            this.setState({resultObj: response})
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
        let categories = this.state.categories.map((c,i) => {
            return <Categories category={c} />
        })
        let rents = <div></div>
        let utilities = <div></div>
        if (this.state.rent == null) {
            rents = <div>You have not entered a rent</div>
        } else {
            rents = <div>{this.state.rent}</div>
        }

        if (this.state.utility.length === 0) {
            utilities = <div>You have not added any utilities</div>
        } else {
            this.state.utility.forEach(u => {
                
            })
        }

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
                    <button onClick={addToIncidentals}>➕</button>
                    <input type="submit" value="Add!" />
                </form>
            </div>
        )
    }
}

export default Budget