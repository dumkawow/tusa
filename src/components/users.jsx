import React from 'react';
import RenderHeaderTitle from "./renderHeaderTitle";
import RenderPhrase from "./renderPhrase";
import RenderUser from "./renderUser";

const Users = ({users, _id, onDelete, toggleBookmark}) => {
		console.log(_id)
		const renderUsers = (arr) => {
			return <div>
				<table className="table">
					<thead>
					<tr>
						<RenderHeaderTitle/>
					</tr>
					</thead>
					{arr.map(user => <RenderUser
						key={users._id}
						users={user}
						onDelete={onDelete}
						toggleBookmark={toggleBookmark}
					/>)}
				</table>
			</div>
		}
		return (
			<div>
				<RenderPhrase
					number={users.length}
				/>
				{users.length === 0
					?
					<span
						style={{fontSize: '30px', display: "block", margin: '0 auto', textAlign: "center"}}
						className='badge bg-danger'>Никто с тобой не тусанет сегодня</span>
					: renderUsers(users)
				}
			</div>
		
		);
	}
;

export default Users;