import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewItem from "./review_item";
import { customAjax } from "../../../src/custom_ajax.js";
import { Button } from "@mui/material";
import { multi_lang_helper } from "../../common";
import { AppContext } from "../../AppContext";
export default function ReviewsPage() {
	var ml = new multi_lang_helper(useContext(AppContext));
	var params = useParams();
	var [reviews, set_reviews] = useState([]);
	var nav = useNavigate();
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_user_reviews",
				product_id: params.product_id,
			},
		}).then(
			(data) => {
				set_reviews(data.result);
			},
			(error) => {
				alert(ml.render({ en: "something went wrong \n task : get_user_reviews", fa: "" }));
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	//todo add layout of adding new review here (instead of using window.prompt and ...)
	function add_new_review() {
		var d = new Date();
		customAjax({
			params: {
				task_name: "new_product_user_review",
				product_id: params.product_id,
				username: window.localStorage.getItem("username"),
				pros: JSON.stringify(
					window
						.prompt(
							ml.render({
								en: "enter pros seperated with comma",
								fa: "",
							})
						)
						.split(",")
				),
				cons: JSON.stringify(
					window
						.prompt(
							ml.render({
								en: "enter cons seperated with comma",
								fa: "",
							})
						)
						.split(",")
				),
				text: window.prompt("enter the text of your review"),
				time: d.getTime(),
				rating_from_five: Number(
					window.prompt(
						ml.render({
							en: "enter a number between 1 to 5 as your rating for this product",
							fa: "",
						})
					)
				),
			},
		})
			.then(
				(data) => {
					console.log(data);
				},
				(error) => {
					console.log(error);
				}
			)
			.finally(() => {
				fetch_data();
			});
	}
	return (
		<div className="border border-blue-400 mx-1 mt-2 px-2 py-1 flex flex-col">
			<div className="flex items-center my-2">
				<h1>
					{ml.render({
						en: "user reviews:",
						fa: "",
					})}
				</h1>
				<Button
					onClick={() => nav(`/products/${params.product_id}/new-product-review`)}
					variant="outlined"
					size="small"
					sx={{ ml: "auto" }}
				>
					{ml.render({
						en: "new review",
						fa: "",
					})}
				</Button>
			</div>

			<hr />
			{reviews.map((review, index) => {
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
