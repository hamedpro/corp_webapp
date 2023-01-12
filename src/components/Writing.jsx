import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../custom_ajax";
import Section from "./section/comp";

export const Writing = () => {
	var { writing_id } = useParams();
	var [writing, set_writing] = useState(null);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_table",
				table_name: "writings",
			},
		}).then((data) => {
			set_writing(data.result.find((i) => i.id == writing_id));
		}, console.log);
	}, []);
	if (writing === null) return "loading writing ...";
	return (
		<Section title={`نوشته ${writing_id}`} className="m-1">
			<div className="p-2 flex flex-col sm:flex-row">
				<img
					className="w-full sm:w-1/2"
					src={`${window.api_endpoint}/${writing.image_filename}`}
				/>
				<div className="w-full sm:w-1/2 p-2 flex flex-col">
					<h1 className="text-3xl">{writing.title}</h1>
					<p className="text-xs">
						حدود {Math.round((new Date().getTime() - writing.publish_date) / 3600000)}{" "}
						ساعت پیش | توسط {writing.publisher_username}
					</p>
					<h1 className="text-lg mt-3">{writing.text}</h1>
				</div>
			</div>
		</Section>
	);
};
