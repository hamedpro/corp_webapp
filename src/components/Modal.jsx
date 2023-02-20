import React from "react";

export function Modal({ type, hideFn = () => {}, is_visible, children, className }) {
	/* during development of the component that you want to inject into this
    use it directly inside your component and inject that modal child component into it */
	var FullScreenTransparentBackground = () => {
		return (
			<div
				className="fixed w-full h-full top-0 left-0 z-50"
				style={{ backgroundColor: "rgba(0,0,0,0.5)", filter: "blur(2px)" }}
				onClick={hideFn}
			></div>
		);
	};
	if (type == "full_screen" && is_visible) {
		return (
			<>
				<FullScreenTransparentBackground />
				<div className={"fixed w-full h-full top-0 left-0 z-50"}>
					<div className="relative w-full h-full top-0 left-0">{children}</div>
				</div>
			</>
		);
	}
	if (type == "type1" && is_visible) {
		return (
			<>
				<FullScreenTransparentBackground />
				<div
					className={
						"fixed overflow-y-auto bg-blue-500 w-full bottom-0 left-0 z-50 rounded-t" +
						(className ? " " + className : "")
					}
				>
					{children}
				</div>
			</>
		);
	}
	return null;
}
