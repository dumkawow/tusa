import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import { Link } from 'react-router-dom'

const UsersTable = ({
	users,
	onSort,
	onToggle,
	selectedSort,
	onDelete,
	// eslint-disable-next-line react/prop-types
	resetUsers
}) => {
	const [filteredUsers, setFilteredUsers] = useState('')
	const columns = {
		name: {
			path: 'name',
			name: 'Имя',
			component: (user) => <Link
				to={`/users/${user._id}`}>{user.name}</Link>
		},
		qualities: {
			name: 'Качества',
			component: (user) => (<QualitiesList qualities={user.qualities}/>)
		},
		professions: { path: 'profession.name', name: 'Профессия' },
		completedMeetings: {
			path: 'completedMeetings',
			name: 'Встретился, раз'
		},
		rate: { path: 'rate', name: 'Оценка' },
		bookmark: {
			path: 'bookmark',
			name: 'Избранное',
			component: (user) => (
				< Bookmark onClick={() => onToggle(user._id)}
				           status={user.bookmark}
				/>
			)
		},
		delete: {
			component: (user) => (
				<button onClick={() => onDelete(user._id)}
				        className="btn btn-danger">
					delete
				</button>
			)
		}
	}
	users = users.filter(user => {
		// eslint-disable-next-line no-unused-expressions
		return user.name.toLowerCase().includes(filteredUsers.toLowerCase())
	})
	return (
		<>
			<div className="input-group flex-nowrap">
				<input type="text" className="form-control"
				       placeholder="Search..."
				       onChange={(({ target }) => {
					       resetUsers()
					       setFilteredUsers(target.value)
				       })}
				/>
			</div>
			<Table
				onSort={onSort}
				selectedSort={selectedSort}
				columns={columns}
				data={users}>
				<TableHeader {...{ onSort, selectedSort, columns }}/>
				<TableBody {...{ columns, data: users }}/>
			</Table>
		</>
	)
}

UsersTable.propTypes = {
	users: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	onToggle: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	id: PropTypes.string,
	selectedSort: PropTypes.object.isRequired
}

export default UsersTable
