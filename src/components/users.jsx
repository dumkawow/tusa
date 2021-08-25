import React, {useState} from 'react';
import api from '../api'

const Users = () => {
		const [users, setUsers] = useState(api.users.fetchAll())
		
		const handleDelete = (userId) => {
			let newUsers = users.filter(user => {
				return user._id !== userId
			})
			
			{
				setUsers(newUsers)
			}
		}
		const renderPhrase = (number) => {
			if (number > 1 && number < 5) {
				return <span className='badge bg-primary'> {number} тусанут с тобой сегодня </span>
			} else {
				return <span className='badge bg-primary'> {number} тусанет с тобой сегодня </span>
			}
			
		}
		const headerTableTitle = ['Имя', 'Качества', 'Профессия', 'Встретился,раз', 'Оценка', ' ']
		
		const headerTable = (arr) => arr.map((tab) => {
			return <th key={tab} scope="col">{tab}</th>
		})
		
		const renderUser = (arr) => {
			return <tbody key={arr._id}>
			<tr key={arr._id}>
				<td>
					{arr.name}
				</td>
				<td>
					{arr.qualities.map(quality => {
						return <span key={quality._id} style={{margin: '5px'}}
						             className={'badge bg-' + quality.color}>{quality.name}</span>
					})}
				</td>
				<td>
					{arr.profession.name}
				</td>
				<td>
					{arr.completedMeetings}
				</td>
				<td>
					{arr.rate}
				</td>
				<td>
					<button className='badge bg-danger border-danger' id={arr._id} onClick={(e) => {
						handleDelete(e.target.id)
					}
					}>delete
					</button>
				</td>
			</tr>
			
			</tbody>
		}
		const renderUsers = (arr) => {
			return <div>
				<div>
					{renderPhrase(users.length)}
				</div>
				<table className="table">
					<thead>
					<tr>
						{headerTable(headerTableTitle)}
					</tr>
					</thead>
					{arr.map(user => renderUser(user))}
				</table>
			</div>
		}
		return (
			<div>
				{users.length === 0
					?
					<span style={{fontSize: '30px', display: "block", margin: '0 auto', textAlign: "center"}}
					      className='badge bg-danger'>Никто с тобой не тусанет сегодня</span>
					: renderUsers(users)
				}
			</div>
		
		);
	}
;

export default Users;