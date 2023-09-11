import { ContentSlider } from "./ContentSlider";
export function CustomBlock({ title, info, button_text, button_onclick, Icon }) {
	return (
		<div className="bg-gray-100 flex p-4 items-center h-full my-1 justify-center sm:justify-start flex-col sm:flex-row">
			<div
				className="w-1/4 rounded-lg flex justify-center items-center"
				style={{ aspectRatio: 1 }}
			>
				<Icon sx={{ width: "90%", height: "90%", color: "rgb(55,65,81)" }} />
			</div>
			<div className="h-full text-gray-700 w-3/4 p-2 text-center">
				<div>
					<h1 className="text-4xl mb-2">{title}</h1>
					<p className="mb-6 text-lg">{info}</p>
				</div>
				<button
					className="border rounded px-2 my-2 text-2xl"
					onClick={button_onclick}
				>
					{button_text}
				</button>
			</div>
		</div>
	);
}
export function Root() {
	return <ContentSlider />;
}
