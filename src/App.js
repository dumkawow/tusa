import React, { useState } from 'react'
import Users from './components/users'
import api from './api'

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }
    const handleToggleBookmark = (userId) => {
        const updUsers = users.filter((user) => {
            if (user._id === userId) {
                user.status = !user.status
                return user
            }
            return user
        })
        setUsers(updUsers)
    }

    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onToggle={handleToggleBookmark}
            />
        </>
    )
}

export default App
