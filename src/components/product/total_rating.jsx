import { LinearProgress, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import Section from "../section/comp";
export default function TotalRating(props) {
	var [avg_rating, set_avg_rating] = useState("loading");
	function calc_rating_percentage(stars_count) {
		var reviews_count = props.reviews.length;
		var count_of_reviews_with_this_stars_count = props.reviews.filter(
			(i) => i.rating_from_five == stars_count
		).length;
		return (count_of_reviews_with_this_stars_count / reviews_count) * 100;
	}
	useEffect(() => {
		const average = (numbers) => {
			var total = 0;
			numbers.forEach((number) => (total += number));
			return total / numbers.length;
		};
		var tmp = Math.round(
			average(props.reviews.map((review) => Number(review.rating_from_five)))
		);
		set_avg_rating(isNaN(tmp) ? "unknown" : tmp);
	}, [props.reviews]);
	return (
		<Section title="the product's user rating:">
			<div className="w-full flex">
				<div className="w-1/5 flex flex-col items-center justify-center">
					<h1 className="" style={{ fontSize: "50px" }}>
						<span className="text-sm">&#8773;</span>
						{avg_rating}
					</h1>
					<p>out of 5</p>
				</div>
				<div className="w-4/5 flex flex-col">
					{[1, 2, 3, 4, 5].reverse().map((item, index) => {
						return (
							<div className="flex items-center mx-2 ml-2 space-x-2" key={index}>
								<Rating readOnly={true} value={item} />
								<div className="w-full">
									<LinearProgress
										value={calc_rating_percentage(item)}
										variant="determinate"
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Section>
	);
}
