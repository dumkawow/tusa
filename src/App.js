import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'
import NavBar from './components/navBar'
import Users from './layouts/users'

const App = () => {
	return (
		<>
			<NavBar/>
			<Switch>
				<Route path="/users/:userId?" exact component={Users}/>
				<Route path="/login" component={Login}/>
				<Route path="/" exact component={Main}/>
				<Redirect to="/"/>
			</Switch>
		</>
	)
}

export default App
