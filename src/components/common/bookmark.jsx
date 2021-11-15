import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ status, ...rest }) => {
	let cl = 'bi bi-bookmark'
	status ? (cl = `${cl}-fill`) : (cl = `${cl}`)
	return (
		<button {...rest} className="btn">
			<i className={cl} />
		</button>
	)
}

Bookmark.propTypes = {
	status: PropTypes.bool
}

export default Bookmark
