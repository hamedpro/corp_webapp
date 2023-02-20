import { useEffect, useState } from "react";
import { multi_lang_helper as ml } from "../common";
export function ReviewItem({ review, className }) {
	var [passed_time_as_text, set_passed_time_as_text] = useState(
		ml({ en: "loading...", fa: "در حال بارگذاری..." })
	);
	useEffect(() => {
		var d = new Date();
		var now = d.getTime();
		var passed_time = now / 1000 - Number(review.time) / 1000;
		if (passed_time < 3600) {
			set_passed_time_as_text(ml({ en: "less than an hour ago", fa: "کمتر از یک ساعت پیش" }));
		}
		if (3600 < passed_time && passed_time < 24 * 3600) {
			set_passed_time_as_text(
				ml({ en: "approx", fa: "حدود" }) +
					` ${Math.round(passed_time / 3600)}` +
					ml({ en: "hours ago", fa: "ساعت پیش" })
			);
		}
		if (24 * 3600 < passed_time) {
			//todo add more cases for texts of passed time
			set_passed_time_as_text(
				ml({ en: "approx", fa: "حدود" }) +
					` ${Math.round(passed_time / (3600 * 24))} ` +
					ml({ en: "days ago", fa: "روز گذشته" })
			);
		}
		//todo add toggle option here for when height is too much
	}, []);

	return (
		<div className={"border border-blue-400 p-2" + " " + className}>
			<b>{review.text}</b>
			<p>
				{ml({ en: "cons", fa: "معایب" })} : {JSON.parse(review.cons).join(",")}
			</p>
			<p>
				{ml({ en: "pros", fa: "مزایا" })} : {JSON.parse(review.pros).join(",")}
			</p>
			<p className="text-xs mt-2">
				@{review.username} . {passed_time_as_text}
			</p>
		</div>
	);
}
