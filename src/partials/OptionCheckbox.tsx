export const OptionCheckbox = ({
	label_top,
	label_bottom,
}: {
	label_top: any;
	label_bottom: any;
}) => {
	return (
		<div className="form-check-option {{ option-classes }}">
			<input
				type="checkbox"
				name="product-option-{{ type }}"
				value="{{ value }}"
				id="option-{{ type }}-{{ @index }}"
			/>
			<label htmlFor="option-{{ type }}-{{ @index }}">
				{label_top && <small className="d-block">{label_top}</small>}
				{label_top && <small>{label_bottom}</small>}
			</label>
		</div>
	);
};
