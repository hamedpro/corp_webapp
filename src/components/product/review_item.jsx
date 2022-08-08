import { useEffect, useState } from "react";

export default function ReviewItem(props) {
	var [passed_time_as_text, set_passed_time_as_text] = useState("loading...");
	useEffect(() => {
		var d = new Date();
		var now = d.getTime();
		var passed_time = now / 1000 - Number(props.review.time) / 1000;
		if (passed_time < 3600) {
			set_passed_time_as_text("less than an hour ago");
		}
		if (3600 < passed_time && passed_time < 24 * 3600) {
			set_passed_time_as_text(`approx ${Math.round(passed_time / 3600)} hours ago`);
		}
		if (24 * 3600 < passed_time) {
			//todo add more cases for texts of passed time
			set_passed_time_as_text(`approx ${Math.round(passed_time / (3600 * 24))} days ago`);
		}
		//todo add toggle option here for when height is too much
	}, []);

	return (
		<div className={"border border-blue-400 p-2" + " " + props.className}>
			<b>{props.review.text}</b>
			<p>cons : {JSON.parse(props.review.cons).join(",")}</p>
			<p>pros : {JSON.parse(props.review.pros).join(",")}</p>
			<p className="text-xs mt-2">
				by @{props.review.username} . posted in {passed_time_as_text}
			</p>
		</div>
	);
}
