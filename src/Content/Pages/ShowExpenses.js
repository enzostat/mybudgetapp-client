import React from 'react'
import Monthlies from './Monthlies';
import Incidentals from './Incidentals';
import SERVER_URL from '../../constants'
import axios from 'axios'


class ShowExpenses extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            stuff: []
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

    render() {
        let monthlies = this.state.stuff.monthlies.forEach(element => {
            return <Monthlies budget={element} />
        });
        let incidentals = this.state.stuff.incidentals.forEach(element => {
            return <Incidentals budget={element} />
        });
        return (
            <div>
                <h3>Monthly Expenses:</h3>
                    <ul>
                    {monthlies}
                    </ul>
                <h3>Submitted Incidentals:</h3>
                    <ul>
                    {incidentals}
                    </ul>
            </div>
        )
    }
}

export default ShowExpenses