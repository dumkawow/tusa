import React from 'react';

const Bookmark = ({status, toggleBookmark, id}) => {
	let cl = 'bi bi-bookmark'
	if (status) {
		cl += '-fill'
	}
	return (
		<button key={id} className="btn" onClick={() => toggleBookmark(id)}>
			<i className={cl}/>
		</button>
	);
};

export default Bookmark;