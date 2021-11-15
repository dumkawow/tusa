import React from 'react'
import Qualities from './qualities'
import PropTypes from 'prop-types'

const QualitiesList = ({ qualities }) => {
	return (
		<>
			{qualities.map(qual => (
				<Qualities key={qual._id} {...qual} />
			))}
		</>
	)
}

QualitiesList.propTypes = {
	qualities: PropTypes.array.isRequired
}

export default QualitiesList
