export var OptionBox = ({children,className=""}) => {
	return (
		<div className={"border border-stone-400 mx-auto p-2 rounded" + " " + className}>
			{children}
		</div>
	);
};
