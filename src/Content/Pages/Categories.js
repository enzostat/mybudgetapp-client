import React from 'react'


const Categories = props => {

    return (
        <option value={props.category}>{props.category}</option>
    )
}

export default Categories