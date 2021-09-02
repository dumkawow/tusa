import React from 'react';

const Bookmark = ({status, ...rest}) => {
	let cl = 'bi bi-bookmark'
	status === true ? cl = `${cl}-fill` : cl = `${cl}`
	return (
		<div>
			<button onClick={() => {rest.onToggle(rest.userId)}} className="btn">
				<i className={cl}/>
			</button>
		</div>
	);
};

export default Bookmark;