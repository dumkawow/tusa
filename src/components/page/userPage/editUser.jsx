import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import api from '../../../api'
import { validator } from '../../../utils/validator'

import TextField from '../../common/form/textField'
import RadioField from '../../common/form/radio.Field'
import SelectField from '../../common/form/selectField'
import MultiSelectField from '../../common/form/multiSelectField'

const Editdata = () => {
	const { userId } = useParams()
	const history = useHistory()

	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState({
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: []
	})

	const [professions, setProfession] = useState([])
	const [qualities, setQualities] = useState({})
	const [errors, setErrors] = useState({})

	// берем профессии
	const getProfessionById = id => {
		for (const prof in professions) {
			const profData = professions[prof]
			if (profData._id === id) return profData
		}
	}

	// берем качества
	const getQualities = elements => {
		const qualitiesArray = []

		for (const elem of elements) {
			for (const qualy in qualities) {
				if (elem.value === qualities[qualy]._id) {
					qualitiesArray.push(qualities[qualy])
				}
			}
		}
		return qualitiesArray
	}

	const handleSubmit = e => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		const { profession, qualities } = data

		api.users
			.update(userId, {
				...data,
				profession: getProfessionById(profession),
				qualities: getQualities(qualities)
			})
			.then(data => history.push(`/users/${data._id}`))
	}
	useEffect(() => {
		setIsLoading(true)
		api.users.getById(userId).then(({ profession, ...data }) =>
			setData(prevState => ({
				...prevState,
				...data,
				profession: profession._id
			}))
		)
		api.qualities.fetchAll().then(data => setQualities(data))
		api.professions.fetchAll().then(data => {
			return setProfession(data)
		})
	}, [])
	useEffect(() => {
		if (data._id) setIsLoading(false)
	}, [data])

	const validatorConfig = {
		email: {
			isRequired: {
				message: 'Электронная почта обязательна для заполнения'
			},
			isEmail: {
				message: 'Email введен некорректно'
			}
		},

		name: {
			isRequired: {
				message: 'Введите ваше имя'
			}
		}
	}

	useEffect(() => validate(), [data])
	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value
		}))
	}

	const validate = () => {
		const errors = validator(data, validatorConfig)
		setErrors(errors)
		return Object.keys(errors).length === 0
	}

	const isValid = Object.keys(errors).length === 0

	return (
		<div className="container mt-5 ">
			<div className="row">
				<div className="col-md-6 offset-md-3 shadow p-4">
					{!isLoading && Object.keys(professions).length > 0 ? (
						<form onSubmit={handleSubmit}>
							<TextField
								name="name"
								value={data.name}
								label="Имя"
								onChange={handleChange}
								error={errors.name}
							/>
							<TextField
								name="email"
								value={data.email}
								label="Emael"
								onChange={handleChange}
								error={errors.email}
							/>
							<SelectField
								label="Выберите вашу профессию"
								defaultOption="Choose.."
								options={professions}
								onChange={handleChange}
								value={data.profession}
								error={errors.profession}
							/>
							<RadioField
								options={[
									{ name: 'Male', value: 'male' },
									{ name: 'Female', value: 'female' },
									{ name: 'Other', value: 'other' }
								]}
								value={data.sex}
								name="sex"
								label="Выберите ваш пол"
								onChange={handleChange}
							/>
							<MultiSelectField
								defaultValue={qualities}
								options={qualities}
								onChange={handleChange}
								name="qualities"
								labe="Выберите ваши качества"
							/>

							<button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
								Отправить
							</button>
						</form>
					) : (
						'Loading'
					)}
				</div>
			</div>
		</div>
	)
}
export default Editdata
