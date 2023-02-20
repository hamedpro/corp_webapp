import { useNavigate } from "react-router-dom";
import React from "react";

export function WritingSquare({ writing }) {
	var nav = useNavigate();
	return (
		<div
			className="bg-blue-300 cursor-pointer rounded-lg w-full sm:w-1/3 mx-2 flex justify-center items-center relative text-white overflow-hidden"
			style={{ aspectRatio: 1 }}
			onClick={() => nav(`/writings/${writing._id}`)}
		>
			<img
				src={vite_api_endpoint + "/" + writing.image_filename}
				className="first_writing_image duration-200 h-full aspect-auto"
			/>
			<div className="absolute h-1/2 top-0 w-full p-2">
				<p className="text-sm">
					حدود {Math.round((new Date().getTime() - writing.publish_date) / 3600000)} ساعت
					پیش | توسط {writing.publisher_username}
				</p>
			</div>
			<div
				className="absolute h-1/3 top-2/3 w-full  p-2"
				style={{ background: "rgb(0, 0 ,255,0.6)" }}
			>
				<h1 className="text-2xl"> {writing.title}</h1>
			</div>
		</div>
	);
}
