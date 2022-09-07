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
	function toggle_review_verification_status(review_id) {
		customAjax({
			params: {
				task_name: "toggle_review_verification_status",
				id: review_id,
			},
		}).then(fetch_data, (e) => console.log(e));
	}
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
					"verification_status",
				]}
				rows={reviews.map((review, index) => {
					return [
						{
							value: review.id,
							onClick: () => {
								alert(
									'this field cant be changed \n changable fields for user reviews : "verification_status"'
								);
							},
						},
						{
							value: review.product_id,
							onClick: () => {
								alert(
									'this field cant be changed \n changable fields for user reviews : "verification_status"'
								);
							},
						},
						{
							value: review.username,
							onClick: () => {
								alert(
									'this field cant be changed \n changable fields for user reviews : "verification_status"'
								);
							},
						},
						{
							value: review.rating_from_five,
							onClick: () => {
								alert(
									'this field cant be changed \n changable fields for user reviews : "verification_status"'
								);
							},
						},
						{
							value: review.pros,
							onClick: () => {
								alert(
									'this field cant be changed \n changable fields for user reviews : "verification_status"'
								);
							},
						},
						{
							value: review.cons,
							onClick: () => {
								alert(
									'this field cant be changed \n changable fields for user reviews : "verification_status"'
								);
							},
						},
						{
							value: review.text,
							onClick: () => {
								alert(
									'this field cant be changed \n changable fields for user reviews : "verification_status"'
								);
							},
						},
						{
							value: review.time,
							onClick: () => {
								alert(
									'this field cant be changed \n changable fields for user reviews : "verification_status"'
								);
							},
						},
						{
							value: review.verification_status,
							onClick: () => {
								toggle_review_verification_status(Number(review.id));
							},
						},
					];
				})}
			/>
		</div>
	);
}
