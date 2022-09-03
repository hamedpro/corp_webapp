export var OptionBox = (props) => {
	return (
		<div className={"border border-stone-400 mx-auto p-2" + " " + props.className}>
			{props.children}
		</div>
	);
};
