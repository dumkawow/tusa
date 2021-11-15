import React, { useEffect, useState } from 'react'

import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radio.Field'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import api from '../../api'
import { validator } from '../../utils/validator'

const RegisterForm = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: [],
		licence: false
	})
	const [errors, setErrors] = useState({})
	const [profession, setProfession] = useState()
	const [qualities, setQualities] = useState({})
	useEffect(() => {
		api.professions.fetchAll().then(data => setProfession(data))
		api.qualities.fetchAll().then(data => setQualities(data))
	}, [])

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
				value: 8
			}
		},
		profession: {
			isRequired: {
				message: 'Обязательно выберите вашу профессию'
			}
		},
		licence: {
			isRequired: {
				message: 'Без соглашения дальше нельзя:('
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
		<form onSubmit={handleSubmit}>
			<TextField onChange={handleChange} name="email" value={data.email} label="Почта" error={errors.email} />
			<TextField
				onChange={handleChange}
				name="password"
				value={data.password}
				label="Пароль"
				type="password"
				error={errors.password}
			/>
			<SelectField
				label="Выберите вашу профессию"
				value={data.profession}
				onChange={handleChange}
				defaultOption="Choose.."
				options={profession}
				error={errors.profession}
			/>

			<RadioField
				options={[
					{ name: 'Male', value: 'male' },
					{ name: 'Female', value: 'female' },
					{ name: 'Other', value: 'other' }
				]}
				onChange={handleChange}
				value={data.sex}
				name="sex"
				label="Выберите ваш пол	"
			/>

			<MultiSelectField
				name="qualities"
				options={qualities}
				onChange={handleChange}
				defaultValue={data.qualities}
				error={errors.licence}
			/>
			{console.log(qualities)}
			<CheckBoxField value={data.licence} error={errors.licence} onChange={handleChange} name="licence">
				Подтвердить <a href="#">лицензионное соглашение</a>
			</CheckBoxField>

			<button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
				Отправить
			</button>
		</form>
	)
}

export default RegisterForm
