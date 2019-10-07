import React from 'react'
import {Redirect} from 'react-router-dom'

const Profile = props => {
    if (!props.user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <h2>{props.user.firstname}'s profile</h2>
        </div>
    )
}

export default Profile