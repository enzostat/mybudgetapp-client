import React from 'react'
import axios from 'axios'
import SERVER_URL from '../../constants'
import Categories from './Categories'


class Budget extends React.Component {

    state = {
        bill: [],
        rent: null,
        mortgage: null,
        utility: [],
        name: null,
        amount: null,
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
        let object = {
            name: this.state.name,
            amount: this.state.amount
        }
        if (this.state.category === 'utility') {
            let temp = []
            temp = [...this.state.utility]
            temp.push(object)
            this.setState({utility: temp})
            // this.setState({[this.state.category]: this.state.})
        } else if (this.state.category === 'bill') {
            let temp = []
            temp = [...this.state.bill]
            temp.push(object)
            this.setState({bill: temp})
        } else if (this.state.category === 'rent') {
            this.setState({rent: this.state.amount})
        } else if (this.state.category === 'mortgage') {
            this.setState({mortgage: this.state.amount})
        }
    }

    storeInput = e => {
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.value)
    }

    handleSelect = e => {
        console.log(e.target.value)
        this.setState({category: e.target.value})
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

        return (
            <div>
                <h3>Rent:</h3>
                {rents}
                <form onSubmit={this.handleSubmit}>
                    <label>Name of Charge</label>
                    <input name="name" onChange={this.storeInput} />
                    <label>Amount of Charge</label>
                    <input name="amount" onChange={this.storeInput} />
                    <label>Category:</label>
                    <select onChange={this.handleSelect}>
                        {categories}
                        {/* <option value="utility">Utility</option>
                        <option value="rent">Rent</option>
                        <option value="mortgage">Mortgage</option>
                        <option value="bill">Bill</option> */}
                    </select>
                    <input type="submit" value="Add!" />
                </form>
            </div>
        )
    }
}

export default Budget