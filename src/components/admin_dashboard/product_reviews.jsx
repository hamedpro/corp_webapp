import { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { CustomTable } from "../custom_table/comp";

export function ProductReviews() {
	var [reviews, set_reviews] = useState([]);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_all_product_reviews",
			},
		}).then(
			(data) => {
				set_reviews(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	return (
		<div className="flex flex-col">
			product reviews {/* todo add filter option */}
			<CustomTable
				headerItems={[
					"id",
					"product id",
					"username",
					"rating from five",
					"pros",
					"cons",
					"text",
					"time",
				]}
				rows={reviews.map((review, index) => {
					return [
						{ value: review.id, onClick: () => {} },
						{ value: review.product_id, onClick: () => {} },
						{ value: review.username, onClick: () => {} },
						{ value: review.rating_from_five, onClick: () => {} },
						{ value: review.pros, onClick: () => {} },
						{ value: review.cons, onClick: () => {} },
						{ value: review.text, onClick: () => {} },
						{ value: review.time, onClick: () => {} },
					];
				})}
			/>
		</div>
	);
}
