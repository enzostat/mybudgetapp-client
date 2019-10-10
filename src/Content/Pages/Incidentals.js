import React from 'react'


const Incidentals = props => {
    return (
        <li>{props.incid.name} - ${props.incid.amount}</li>
    )
}

export default Incidentals