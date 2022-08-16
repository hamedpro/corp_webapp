export default function SearchModal() {
	return (
		<div className="h-full w-full relative">
			<div className="flex">
				<ArrowBackIosNewRounded sx={{ color: "white" }} />
				<h1 className="ml-2">search center</h1>
			</div>
			<input
				type="text"
				id="search_input"
				className="border border-stone-400"
				placeholder="start typing here"
			/>
		</div>
	);
}
