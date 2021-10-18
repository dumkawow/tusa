import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import QualitiesList from './qualitiesList'
import { useHistory } from 'react-router-dom'

const UserPage = ({ userId }) => {
	const history = useHistory()
	const [user, setUser] = useState()
	useEffect(() => {
		api.users.getById(userId).then((data) => setUser(data))
	})
	const handleClick = () => {
		history.push('/users')
	}
	if (user) {
		return <>
			<h1>{user.name}</h1>
			<h2>Профессия: {user.profession.name}</h2>
			<QualitiesList qualities={user.qualities}/>
			<h3>completedMeetings {user.completedMeetings}</h3>
			<h3>Rate {user.rate}</h3>
			<button onClick={() => handleClick()}>Back</button>
		</>
	} else {
		return <h1>Loading</h1>
	}
}

UserPage.propTypes = {
	userId: PropTypes.string.isRequired
}

export default UserPage
