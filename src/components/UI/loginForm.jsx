import React, { useEffect, useState } from 'react'

import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import { validator } from '../../utils/validator'

const LoginForm = () => {
	const [data, setData] = useState({ email: '', password: '', stayOn: false })
	const [errors, setErrors] = useState({})
	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value
		}))
	}

	const validatorConfig = {
		email: {
			isRequired: {
				message: 'Электронная почта обязательна для заполнения'
			},
			isEmail: {
				message: 'емаил введен некорректно'
			}
		},
		password: {
			isRequired: {
				message: 'Пароль обязательный для заполнения'
			},
			isCapitalSymbol: {
				message: 'Пароль должен содержать заглавную букву'
			},
			isContainDigit: {
				message: 'Пароль должен содержать цифру'
			},
			min: {
				message: 'Пароль должен быть длинней 8 символов',
				value: 1
			}
		}
	}
	useEffect(() => validate(), [data])
	const validate = () => {
		const errors = validator(data, validatorConfig)
		setErrors(errors)
		return Object.keys(errors).length === 0
	}
	const isValid = Object.keys(errors).length === 0

	const handleSubmit = e => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		console.log(data)
	}

	return (
		<form onSubmit={e => handleSubmit(e)}>
			<TextField onChange={handleChange} name="email" value={data.email} label="Почта" error={errors.email} />
			<TextField
				onChange={handleChange}
				name="password"
				value={data.password}
				label="Пароль"
				type="password"
				error={errors.password}
			/>

			<CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
				Чужой компухтер
			</CheckBoxField>

			<button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
				Отправить
			</button>
		</form>
	)
}

export default LoginForm
