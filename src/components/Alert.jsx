export function Alert({ children, className, icon }) {
	return (
		<div
			className={
				"flex space-x-1 bg-blue-300 p-2" +
				" " +
				(typeof className !== "undefined" ? className : "")
			}
		>
			<span>{typeof icon !== "undefined" ? <>{icon}</> : null}</span>
			<span>{children}</span>
		</div>
	);
}
