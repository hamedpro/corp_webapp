import { useState, useEffect } from "react";
export default function TotalRating(props) {
	var [avg_rating, set_avg_rating] = useState("loading");
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
		<>
			<h1 className="text-lg">the product's user rating:</h1>
			<hr className="mb-2" />
			<div className="border border-blue-400 p-2 rounded">
				<h1>{avg_rating}</h1>
				<span>/5 (rounded)</span>
			</div>
		</>
	);
}
