import React from 'react'
import PropTypes from 'prop-types'

const Qualities = ({ id, color, name }) => {
	return (
		<>
			<span key={id} className={'badge m-1 bg-' + color}>
				{name}
			</span>
		</>
	)
}

Qualities.propTypes = {
	id: PropTypes.string,
	color: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
}

export default Qualities
