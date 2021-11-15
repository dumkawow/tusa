import React from 'react'
import { useParams } from 'react-router-dom'
import UsersList from '../components/page/usersListPage'
import UserPage from '../components/page/userPage'
import EditUser from '../components/page/userPage/editUser'

const Users = () => {
	const params = useParams()
	const { userId, edit } = params
	return <>{userId ? edit ? <EditUser userId={userId} /> : <UserPage userId={userId} /> : <UsersList />}</>
}

export default Users
