import { useContext, useEffect, useState } from "react";
import { multi_lang_helper } from "../../common";
import { AppContext } from "../../AppContext";
export default function ReviewItem(props) {
	var ml = new multi_lang_helper(useContext(AppContext));
	var [passed_time_as_text, set_passed_time_as_text] = useState(
		ml.render({ en: "loading...", fa: "" })
	);
	useEffect(() => {
		var d = new Date();
		var now = d.getTime();
		var passed_time = now / 1000 - Number(props.review.time) / 1000;
		if (passed_time < 3600) {
			set_passed_time_as_text(ml.render({ en: "less than an hour ago", fa: "" }));
		}
		if (3600 < passed_time && passed_time < 24 * 3600) {
			set_passed_time_as_text(
				ml.render({ en: "approx", fa: "" }) +
					` ${Math.round(passed_time / 3600)}` +
					ml.render({ en: "hours ago" })
			);
		}
		if (24 * 3600 < passed_time) {
			//todo add more cases for texts of passed time
			set_passed_time_as_text(
				ml.render({ en: "approx", fa: "" }) +
					` ${Math.round(passed_time / (3600 * 24))} ` +
					ml.render({ en: "days ago", fa: "" })
			);
		}
		//todo add toggle option here for when height is too much
	}, []);

	return (
		<div className={"border border-blue-400 p-2" + " " + props.className}>
			<b>{props.review.text}</b>
			<p>
				{ml.render({ en: "cons", fa: "" })} : {JSON.parse(props.review.cons).join(",")}
			</p>
			<p>
				{ml.render({ en: "pros", fa: "" })} : {JSON.parse(props.review.pros).join(",")}
			</p>
			<p className="text-xs mt-2">
				@{props.review.username} . {passed_time_as_text}
			</p>
		</div>
	);
}
