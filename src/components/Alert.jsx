export function Alert(props) {
	return (
		<div
			className={
				"flex space-x-1 bg-blue-300 p-2" +
				" " +
				(typeof props.className !== "undefined" ? props.className : "")
			}
		>
			<span>{typeof props.icon !== "undefined" ? <>{props.icon}</> : null}</span>
			<span>{props.children}</span>
		</div>
	);
}
