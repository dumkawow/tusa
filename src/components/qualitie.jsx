import React from 'react';

const Qualitie = ({id, color, name}) => {
	return (
		<>
			<span key={id}
			      className={'badge m-1 bg-' + color}> {name}
						</span>
		</>
	);
};

export default Qualitie;