export const FilterCheckbox = () => {
	return (
		<div className="form-group form-check mb-0">
			<input
				type="checkbox"
				className="form-check-input"
				id="filter-{{ type }}-{{ @index }}"
			/>
			<label
				className="form-check-label fw-normal text-body flex-grow-1 d-flex justify-content-between"
				htmlFor="filter-{{ type }}-{{ @index }}"
			>
				{/* {{ label }} {{#if count}} <span
            className="text-muted">({{ count }})</span>{{/if}} */}
			</label>
		</div>
	);
};
