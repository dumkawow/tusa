import React from 'react'
import TableHeader from './tableHeader'
import PropTypes from 'prop-types'
import TableBody from './tableBody'

const Table = ({ onSort, selectedSort, columns, data, children }) => {
	return (
		<table className="table">
			{children || (
				<>
					<TableHeader {...{ onSort, selectedSort, columns }} />
					<TableBody {...{ columns, data }} />
				</>
			)}
		</table>
	)
}
Table.propTypes = {
	onSort: PropTypes.func,
	selectedSort: PropTypes.object,
	columns: PropTypes.object,
	data: PropTypes.array,
	children: PropTypes.array
}

export default Table