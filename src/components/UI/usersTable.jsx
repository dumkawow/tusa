import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from '../common/bookmark'
import Qualities from '../../components/UI/qualities'
import Table, { TableBody, TableHeader } from '../common/table'
import { Link } from 'react-router-dom'

const UsersTable = ({ users, onSort, onToggle, selectedSort, onDelete }) => {
	const columns = {
		name: {
			path: 'name',
			name: 'Имя',
			component: user => <Link to={`/users/${user._id}`}>{user.name}</Link>
		},
		qualities: {
			name: 'Качества',
			component: user => <Qualities qualities={user.qualities} />
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
			component: user => <Bookmark onClick={() => onToggle(user._id)} status={user.bookmark} />
		},
		delete: {
			component: user => (
				<button onClick={() => onDelete(user._id)} className="btn btn-danger">
					delete
				</button>
			)
		}
	}
	return (
		<>
			<Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}>
				<TableHeader {...{ onSort, selectedSort, columns }} />
				<TableBody {...{ columns, data: users }} />
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
