export const OptionRadio = ({
	disabled,
	label_top,
	label_bottom,
	index,
	option_classes,
	type,
	value,
}: {
	disabled: any;
	label_top: any;
	label_bottom: any;
	index: number;
	option_classes: any;
	type: any;
	value: any;
}) => {
	return (
		<div className={`form-check-option ${option_classes}`}>
			<input
				type="radio"
				name={`product-option-${type}`}
				value={value}
				disabled={disabled}
				id={`option-${type}-${index}`}
			/>
			<label htmlFor={`option-${type}-${index}`}>
				{label_top && <small className="d-block">{label_top} </small>}
				{label_bottom && <small>{label_bottom}</small>}
			</label>
		</div>
	);
};
