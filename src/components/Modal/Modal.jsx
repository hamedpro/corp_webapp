import React from "react";

export default function Modal(props) {
	/* during development of the component that you want to inject into this
    use it directly inside your component and inject that modal child component into it */
	return (
		<div
			className={
				"fixed w-full h-full top-0 left-0 z-50 " + (props.is_visible ? "" : "hidden")
			}
		>
			<div className="relative w-full h-full top-0 left-0">{props.children}</div>
		</div>
	);
}
