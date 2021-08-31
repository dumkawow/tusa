import React from 'react';

const RenderHeaderTitle = () => {
	
	const headerTableTitle = ['Имя', 'Качества', 'Профессия', 'Встретился,раз', 'Оценка', 'Избранное', ' ']
	return (
		<>
			{headerTableTitle.map(title => {
				return <th key={title} scope="col">{title}</th>
			})}
		</>
	)
};

export default RenderHeaderTitle;