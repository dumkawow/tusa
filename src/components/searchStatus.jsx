import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
	const renderPhrase = (num) => {
		const lastOne = Number(num.toString().slice(-1))

		if (num > 4 && num < 15) return 'человек тусанет'
		if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут'
		if (lastOne === 1) return 'человек тусанет'
		return 'человек тусанет'
	}
	return (
		<div>
			<div>
				<h2>
          <span className={length > 0 ? 'badge bg-primary' : 'badge bg-danger'}>
            {length > 0
	            ? ` ${length} ${renderPhrase(length)} с тобой сегодня`
	            : 'никто с тобой не тусанет'}
          </span>
				</h2>
			</div>
		</div>
	)
}

SearchStatus.propTypes = {
	length: PropTypes.number
}

export default SearchStatus
