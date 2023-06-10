export function Section({ className, top_line_style, secondary, title, children, innerClassName }) {
	return (
		<div
			className={
				" overflow-y-hidden section" +
				(typeof className == "undefined" ? "" : " " + className)
			}
		>
			<div className={["border border-blue-400 rounded pb-2"].join(" ")}>
				<div
					className={["w-full h-8 rounded-t relative bg-blue-400 mb-4"].join(" ")}
					style={top_line_style ? top_line_style : {}}
				>
					<h1 className="mx-2 top-6 -translate-y-1/2 bg-white border border-blue-600 rounded-lg absolute text-lg px-2">
						{title}
					</h1>
					{secondary ? (
						<div className="mx-4 top-6 right-0 -translate-y-1/2 absolute text-lg px-2">
							{secondary}
						</div>
					) : null}
				</div>
				<div className={[innerClassName !== undefined ? innerClassName : ""].join(" ")}>
					{children}
				</div>
			</div>
		</div>
	);
}
