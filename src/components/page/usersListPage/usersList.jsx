import React, { useEffect, useState } from 'react'
import SearchStatus from '../../UI/searchStatus'
import api from '../../../api'
import Pagination from '../../common/pagination'
import PropTypes from 'prop-types'
import _ from 'lodash'
import UsersTable from '../../UI/usersTable'
import { paginate } from '../../../utils/paginate'
import GroupList from '../../common/groupList'

const UsersList = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [professions, setProfession] = useState()
	const [selectedProf, setSelectedProf] = useState()
	const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
	const [searchQuery, setSearchQuery] = useState()
	const pageSize = 16
	const [users, setUsers] = useState('')
	useEffect(() => {
		api.users.fetchAll().then(data => setUsers(data))
	}, [])
	const handleDelete = userId => {
		setUsers(users.filter(user => user._id !== userId))
	}
	const handleToggleBookmark = userId => {
		setUsers(
			users.map(user => {
				if (user._id === userId) {
					return { ...user, bookmark: !user.bookmark }
				}
				return user
			})
		)
	}

	useEffect(() => {
		api.professions.fetchAll().then(data => {
			setProfession(data)
		})
	}, [currentPage])

	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])

	const handleChangePage = pageIndex => setCurrentPage(pageIndex)

	const handleProfessionSelect = item => {
		if (searchQuery !== '') setSearchQuery('')
		setSelectedProf(item)
	}

	const handleSort = item => setSortBy(item)

	const handleSearchQuery = ({ target }) => {
		setSelectedProf(undefined)
		setSearchQuery(target.value)
	}

	if (users) {
		const filteredUsers = searchQuery
			? users.filter(user => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
			: selectedProf
			? users.filter(user => {
					return _.isEqual(user.profession, selectedProf)
			  })
			: users
		const count = filteredUsers.length
		const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
		const usersCrop = paginate(sortedUsers, currentPage, pageSize)
		const clearFilter = () => {
			setSelectedProf(undefined)
		}

		return (
			<div className="d-flex">
				{professions && (
					<div className="d-flex flex-column flex-shrink-0 p-2">
						<GroupList
							selectedItem={selectedProf}
							items={professions}
							onItemSelect={handleProfessionSelect}
						/>
						<button className="btn btn-secondary mt-2" onClick={clearFilter}>
							Очистить
						</button>
					</div>
				)}

				<div className="d-flex flex-column">
					<SearchStatus length={count} />
					<input
						type="text"
						className="form-control"
						name="searchQuery"
						placeholder="Search..."
						onChange={handleSearchQuery}
						value={searchQuery}
					/>
					{count > 0 && (
						<UsersTable
							users={usersCrop}
							onSort={handleSort}
							onDelete={handleDelete}
							selectedSort={sortBy}
							onToggle={handleToggleBookmark}
							resetUsers={clearFilter}
						/>
					)}
					<div className="d-flex justify-content-center">
						<Pagination
							itemsCount={count}
							pageSize={pageSize}
							onPageChange={handleChangePage}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>
		)
	}
	return 'loading'
}
UsersList.propTypes = {
	usersList: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default UsersList
