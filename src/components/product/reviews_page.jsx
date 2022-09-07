import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewItem from "./review_item";
import { customAjax } from "../../../src/custom_ajax.js";
import { Button } from "@mui/material";
import { multi_lang_helper as ml } from "../../common";
export default function ReviewsPage() {
	var params = useParams();
	var [reviews, set_reviews] = useState([]);
	var verified_reviews = () => reviews.filter((review) => review.verification_status === "true");
	var nav = useNavigate();
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_all_product_reviews",
				product_id: params.product_id,
			},
		}).then(
			(data) => {
				set_reviews(data.result);
			},
			(error) => {
				alert(ml({ en: "something went wrong", fa: "مشکلی رخ داد" }));
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	//todo add layout of adding new review here (instead of using window.prompt and ...)
	return (
		<div className="border border-blue-400 mx-1 mt-2 px-2 py-1 flex flex-col">
			<div className="flex items-center my-2">
				<h1>
					{ml({
						en: "user reviews:",
						fa: "نظرات کابران:",
					})}
				</h1>
				<Button
					onClick={() => nav(`/products/${params.product_id}/new-product-review`)}
					variant="outlined"
					size="small"
					sx={{ ml: "auto" }}
				>
					{ml({
						en: "new review",
						fa: "ثبت نظر جدید",
					})}
				</Button>
			</div>

			<hr />
			{verified_reviews().map((review, index) => {
				//put limit on count of shown reviews if count is too high
				return (
					<React.Fragment key={index}>
						<ReviewItem review={review} className="mt-2" />
					</React.Fragment>
				);
			})}
		</div>
	);
}
