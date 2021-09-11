import React, { useState } from 'react'
import User from './user'
import SearchStatus from './searchStatus'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'

const Users = ({ users: allUsers, ...rest }) => {
    const count = allUsers.length
    const pageSize = 4
    const [currentPage, setCurrentPage] = useState(1)
    const handleChangePage = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const users = paginate(allUsers, currentPage, pageSize)
    return (
        <>
            <SearchStatus length={users.length} />
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <User key={user._id} {...user} {...rest} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handleChangePage}
                currentPage={currentPage}
            />
        </>
    )
}
Users.propTypes = {
    users: PropTypes.array.isRequired
}

export default Users
