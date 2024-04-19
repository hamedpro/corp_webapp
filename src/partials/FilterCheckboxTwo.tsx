export const FilterCheckboxTwo = ({
	label,
	type,
	index,
}: {
	index: number;
	label?: string;
	type: string;
}) => {
	return (
		<div className="form-group d-inline-block mr-2 mb-2 form-check-bg form-check-custom">
			<input
				type="checkbox"
				className="form-check-bg-input"
				id={`filter-${type}-${index}`}
			/>
			<label
				className="form-check-label fw-normal"
				htmlFor={`filter-${type}-${index}`}
			>
				{label}
			</label>
		</div>
	);
};
