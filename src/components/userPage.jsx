import React from 'react'
import api from '../api'
import { useHistory, useParams } from 'react-router-dom'

const UserPage = () => {
	const history = useHistory()
	const params = useParams()
	const users = api.users.default.fetchAlll()
	const filterUsers = (id) => {
		return users.filter((user) => user._id === id)
	}
	const user = filterUsers(params.userId)
	if (user.length > 0) {
		return (
			<>
				{user.map((user) => {
					return (
						<div key={user._id}>
							<h2> {user.name} </h2>
							<h3>Профессия: {user.profession.name} </h3>
							{user.qualities.map(
								q => <span
									className={`badge m-1 bg-${q.color}`}
									key={q._id}>  {q.name} </span>)}
							<h4> completedMeetings: {user.completedMeetings} </h4>
							<h4> rate: {user.rate} / 5 </h4>
						</div>
					)
				})}
				<button onClick={history.goBack}>Все пользователи</button>
			</>
		)
	} else return 'Loading'
}

export default UserPage
