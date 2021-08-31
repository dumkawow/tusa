import React, {useState} from "react";
import Users from "./components/users";
import api from "./api";

function App() {
	const [users, setUsers] = useState(api.users.fetchAll())
	
	const toggleFeatures = (id) => {
		const updatedUsers = users.filter(user => {
			if (user._id === id) {
				user.status = !user.status
				return user
			}
			return user;
		})
		setUsers(updatedUsers);
	}
	const handleDelete = (userId) => {
		let newUsers = users.filter(user => {
			return user._id !== userId
		})
		{
			setUsers(newUsers)
		}
	}
	
	
	return (
		<div>
			<Users
				onDelete={handleDelete}
				users={users}
				toggleBookmark={toggleFeatures}
			/>
		</div>
	);
}

export default App;
