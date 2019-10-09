import React from 'react'


const Monthlies = props => {

    return (
        <div>
            <li>
                {props.monthly.name} - ${props.monthly.amount}
            </li>
        </div>
    )
}

export default Monthlies