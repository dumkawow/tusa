import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

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
	return (
		<Table
			onSort={onSort}
			selectedSort={selectedSort}
			columns={columns}
			data={users}>
			<TableHeader {...{ onSort, selectedSort, columns }}/>
			<TableBody {...{ columns, data: users }}/>
		</Table>
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
