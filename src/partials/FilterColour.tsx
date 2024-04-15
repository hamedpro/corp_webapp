import React from "react";

export const FilterColour = () => {
	return (
		<div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom {{ colour-class }}">
			<input
				type="checkbox"
				className="form-check-color-input"
				id="filter-{{ type }}-{{ @index }}"
			/>
			<label
				className="form-check-label"
				htmlFor="filter-{{ type }}-{{ @index }}"
			></label>
		</div>
	);
};
