import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({ label, value, onChange, defaultOption, options, error, id }) => {
	const getInputClasses = () => {
		return 'form-select' + (error ? ' is-invalid' : '')
	}

	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}

	const optionsArray =
		!Array.isArray(options) && typeof options === 'object'
			? Object.keys(options).map(optionName => ({
					name: options[optionName].name,
					value: options[optionName]._id
			  }))
			: options

	// ПОЧЕМУ У МЕНЯ ПРИХОДИТ МАССИВ, А В УРОКЕ ОБЪЕКТ?
	return (
		<div className="mb-4">
			<label htmlFor="validationCustom04" className="form-label">
				{label}
			</label>
			<select
				key={id}
				value={value}
				className={getInputClasses()}
				onChange={handleChange}
				name="profession"
				id="validationCustom04"
			>
				<option disabled value="">
					{defaultOption}
				</option>
				{optionsArray &&
					optionsArray.map(options => (
						<option key={options._id} value={options.name}>
							{options.name}
						</option>
					))}
			</select>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	)
}

SelectField.propTypes = {
	label: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	defaultOption: PropTypes.string,
	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	error: PropTypes.string
}

export default SelectField
