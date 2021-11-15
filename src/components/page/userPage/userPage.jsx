import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../UI/qualities'
import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'

const UserPage = ({ userId }) => {
	console.log(userId)
	const [user, setUser] = useState()
	useEffect(() => {
		api.users.getById(userId).then(data => setUser(data))
	}, [])
	// const history = useHistory()
	// const handleClick = () => {
	// 	history.push('/edit')
	// }
	if (user) {
		console.log(user, 'user user user user user')
		console.log(user.profession)
		return (
			<>
				<h1>{user.name}</h1>
				<h2>Профессия: {user.profession?.name}</h2>
				<Qualities qualities={user.qualities} />
				<h3>completedMeetings {user.completedMeetings}</h3>
				<h3>Rate {user.rate}</h3>

				<Link to={`/users/${userId}/edit`}>
					<button>Изменить</button>
				</Link>
			</>
		)
	} else {
		return <h1>Loading</h1>
	}
}

UserPage.propTypes = {
	userId: PropTypes.string.isRequired
}

export default UserPage
