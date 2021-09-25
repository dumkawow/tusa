import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ id, color, name }) => {
	return (
		<>
      <span key={id} className={'badge m-1 bg-' + color}>
        {' '}
	      {name}
      </span>
		</>
	)
}

Quality.propTypes = {
	id: PropTypes.string,
	color: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
}

export default Quality
