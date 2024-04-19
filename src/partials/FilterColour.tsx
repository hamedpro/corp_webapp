export const FilterColour = ({
	"colour-class": colour_class,
	index,
	type,
}: {
	"colour-class": string;
	index: number;
	type: string;
}) => {
	return (
		<div
			className={`form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom ${colour_class}`}
		>
			<input
				type="checkbox"
				className="form-check-color-input"
				id={`filter-${type}-${index}`}
			/>
			<label
				className="form-check-label"
				htmlFor={`filter-${type}-${index}`}
			></label>
		</div>
	);
};
