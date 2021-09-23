import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import Bookmark from './bookmark'

const UsersTable = ({
	users,
	onSort,
	onToggle,
	selectedSort,
	onDelete,
	...rest
}) => {
	const columns = {
		name: {
			path: 'name',
			name: 'Имя'
		},
		qualities: { name: 'Качества' },
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
	return (
		<table className="table">
			<TableHeader {...{ onSort, selectedSort, columns }}/>
			<TableBody {...{ columns, data: users }}/>
		</table>
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