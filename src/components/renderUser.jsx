import React from 'react';
import Bookmark from "./bookmark";

const RenderUser = ({users, onDelete, toggleBookmark}) => {
	return (
		<tbody key={users._id}>
		<tr key={users._id}>
			<td>
				{users.name}
			</td>
			<td>
				{users.qualities.map(quality => {
					return <span key={quality._id} style={{margin: '5px'}}
					             className={'badge bg-' + quality.color}>{quality.name}</span>
				})}
			</td>
			<td>
				{users.profession.name}
			</td>
			<td>
				{users.completedMeetings}
			</td>
			<td>
				{users.rate}
			</td>
			<td>
				<Bookmark
					key={users._id}
					id={users._id}
					status={users.status}
					toggleBookmark={toggleBookmark}
				/>
			</td>
			<td>
				<button
					className='badge bg-danger border-danger'
					id={users._id}
					key={users._id}
					onClick={(e) => {
						onDelete(e.target.id)
					}
					}>delete
				</button>
			</td>
		</tr>
		</tbody>
	);
};

export default RenderUser;