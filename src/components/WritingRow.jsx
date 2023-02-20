import { useNavigate } from "react-router-dom";
import React from "react";
import { gen_link_to_file } from "../common";
export function WritingRow({
	className,
	publish_date,
	publisher_username,
	image_filename,
	_id,
	title,
}) {
	var nav = useNavigate();
	return (
		<div
			className={
				`w-full h-1/3 bg-blue-100  text-blue-600 
				flex-row border border-blue-300 flex 
				cursor-pointer duration-200 hover:scale-105 hover:bg-blue-200 px-6 ` + (className ? className : "")
			}
			onClick={() => nav(`/writings/${_id}`)}
		>
			<div className="flex items-center">
				<div className="w-20 h-20 flex justify-center items-center">
					<img src={gen_link_to_file(image_filename)} className="rounded" />
				</div>
			</div>
			<div className="flex flex-col p-2 justify-center">
				<h1 className="items-start text-2xl">{title}</h1>
				<p className="text-sm">
					حدود {Math.round((new Date().getTime() - publish_date) / 3600000)} ساعت پیش |
					توسط {publisher_username}
				</p>
			</div>
		</div>
	);
}
