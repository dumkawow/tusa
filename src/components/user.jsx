import React from 'react'
import Quality from './qualitie'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

const User = ({
	_id,
	name,
	qualities,
	profession,
	completedMeetings,
	rate,
	status,
	onDelete,
	onToggle
}) => {
	return (
		<>
			<tr key={_id}>
				<td>{name}</td>
				<td>
					{qualities.map((q) => {
						return (
							<Quality key={q._id} name={q.name} color={q.color}
							         id={q._id}/>
						)
					})}
				</td>
				<td>{profession.name}</td>
				<td>{completedMeetings}</td>
				<td>{rate}</td>
				<td>
					<Bookmark onToggle={onToggle} userId={_id} status={status}/>
				</td>
				<td>
					{
						<button onClick={() => onDelete(_id)}
						        className="btn btn-danger">
							{' '}
							delete{' '}
						</button>
					}
				</td>
			</tr>
		</>
	)
}

User.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	qualities: PropTypes.array.isRequired,
	profession: PropTypes.object.isRequired,
	completedMeetings: PropTypes.number.isRequired,
	rate: PropTypes.number.isRequired,
	status: PropTypes.bool,
	onDelete: PropTypes.func.isRequired,
	onToggle: PropTypes.func.isRequired
}

export default User
