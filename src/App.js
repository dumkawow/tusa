import React from 'react'
import Main from './components/main'
import { Route, Switch } from 'react-router-dom'
import Users from './components/users'
import Login from './components/login'
import UserPage from './components/userPage'
import api from './api/fake.api/user.api'

const App = () => {
	const id = api.getById()
	console.log(id)
	// const path = () => id.then(data => data._id)

	return (
		<>
			<Main/>
			<Switch>
				<Route path="/users" exact component={Users}/>
				<Route path="/users/:userId?" component={UserPage}/>
				<Route path="/login" component={Login}/>
			</Switch>
		</>
	)
}

export default App
