import React, { useEffect, useState } from 'react'
import SearchStatus from './searchStatus'
import { paginate } from '../utils/paginate'
import api from '../api'
import GroupList from './groupList'
import User from './user'
import Pagination from './pagination'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Users = ({ users: allUsers, ...rest }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [professions, setProfession] = useState()
	const [selectedProf, setSelectedProf] = useState()
	const pageSize = 4
	useEffect(() => {
		api.professions.fetchAll().then((data) => {
			setProfession(data)
		})
	}, [currentPage])

	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])
	const handleChangePage = (pageIndex) => {
		setCurrentPage(pageIndex)
	}
	const handleProfessionSelect = (item) => {
		setSelectedProf(item)
	}
	const filteredUsers = selectedProf
		? allUsers.filter((user) => {
			return _.isEqual(user.profession, selectedProf)
		})
		: allUsers
	const count = filteredUsers.length
	const users = paginate(filteredUsers, currentPage, pageSize)
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
					<button className="btn btn-secondary mt-2"
					        onClick={clearFilter}>
						{' '}
						Очистить
					</button>
				</div>
			)}

			<div className="d-flex flex-column">
				<SearchStatus length={count}/>
				{count > 0 && (
					<table className="table">
						<thead>
						<tr>
							<th scope="col">Имя</th>
							<th scope="col">Качества</th>
							<th scope="col">Профессия</th>
							<th scope="col">Встретился, раз</th>
							<th scope="col">Оценка</th>
							<th scope="col">Избранное</th>
							<th/>
						</tr>
						</thead>
						<tbody>
						{users.map((user) => (
							<User key={user._id} {...user} {...rest} />
						))}
						</tbody>
					</table>
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
Users.propTypes = {
	users: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default Users
