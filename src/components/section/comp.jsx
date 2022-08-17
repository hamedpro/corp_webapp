export default function Section(props) {
	return (
		<div
			className={
				"section" + (typeof props.className == "undefined" ? "" : " " + props.className)
			}
		>
			{typeof props.title != "undefined" ? (
				<div className="border border-blue-400 rounded mx-1 mt-2 pb-2">
					<div className="w-full h-8 rounded-t relative bg-blue-400 mb-4">
						<h1 className="mx-2 top-6  -translate-y-1/2 bg-white border border-blue-600 rounded-lg absolute text-lg px-2">
							{props.title}
						</h1>
					</div>

					{props.children}
				</div>
			) : (
				<div className="border border-blue-400 rounded mx-1 mt-2 pb-2">
					{props.children}
				</div>
			)}
		</div>
	);
}
