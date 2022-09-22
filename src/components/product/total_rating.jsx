import { InfoRounded } from "@mui/icons-material";
import { LinearProgress, Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { multi_lang_helper as ml } from "../../common";
import { Alert } from "../alert/comp";
import Section from "../section/comp";
export default function TotalRating(props) {
	var [avg_rating, set_avg_rating] = useState(ml({ en: "loading", fa: "در حال بارگذاری..." }));
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
		set_avg_rating(isNaN(tmp) ? '?' : tmp);
	}, [props.reviews]);
	return (
		<Section
			title={ml({
				en: "the product's user rating:",
				fa: "بررسی کالا توسط مردم",
			})}
			className="mx-1 mt-2"
		>
			<div className="w-full ">
				<div className="px-2 flex flex-col md:flex-row">
					<div className="md:w-1/2 flex justify-center items-center">
						{props.reviews.length === 0 && (
							<Alert icon={<InfoRounded />}>
								{ml({
									en : `there is not any review for this product, total rating section below
									will be activated when the first review is submited`,
									fa : ""
								})}
							</Alert>
						)}
					</div>

					<div className="flex md:w-1/2">
						<div className="w-1/5 flex flex-col items-center justify-center">
							<h1 className="" style={{ fontSize: "50px" }}>
								<span className="text-sm">&#8773;</span>
								{avg_rating}
							</h1>
							<p>
								{ml({
									en: "out of 5",
									fa: "از پنج",
								})}
							</p>
						</div>
						<div className="w-4/5 flex flex-col">
							{[1, 2, 3, 4, 5].reverse().map((item, index) => {
								return (
									<div
										className="flex items-center mx-2 ml-2 space-x-2"
										key={index}
									>
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
				</div>
			</div>
		</Section>
	);
}
