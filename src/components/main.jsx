import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
	return (
		<ul className="nav">
			<li className="nav-item">
				<Link className="nav-link active" aria-current="page"
				      to="/">Main</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/login">Login</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/users">Users</Link>
			</li>
		</ul>
	)
}

export default Main