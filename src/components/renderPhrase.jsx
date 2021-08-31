import React from 'react';


const RenderPhrase = ({number, key}) => {
	console.log(key)
	
	const renderPhrase = (number) => {
		if (number > 1 && number < 5) {
			return <span key={key} className='badge bg-primary'> {number} тусанут с тобой сегодня </span>
		} else {
			return <span className='badge bg-primary'> {number} тусанет с тобой сегодня </span>
		}
	}
	return (
		<div>
			{number
				? renderPhrase(number)
				: false
			}
		</div>
	);
};

export default RenderPhrase;