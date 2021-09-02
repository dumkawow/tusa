import React from 'react';
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({users, onDelete, onToggle}) => {
	return (
		<>
			{users.map(user => {
				return <tr key={user._id}>
					<td>{user.name}</td>
					<td>
						{user.qualities.map(q => {
							return <Qualitie
								key={q._id}
								name={q.name}
								color={q.color}
								id={q._id}
							/>
						})
						}
					
					</td>
					<td>{user.profession.name}</td>
					<td>{user.completedMeetings}</td>
					<td>{user.rate}</td>
					<td>
						<Bookmark
							onToggle={onToggle}
							userId={user._id}
							status={user.status}
						/>
					</td>
					<td>
						{<button
							onClick={() => onDelete(user._id)}
							className="btn btn-danger"> delete </button>}
					</td>
				
				</tr>
			})}
		</>
	);
};

export default User;
