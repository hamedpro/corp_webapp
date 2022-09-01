import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewItem from "./review_item";
import { customAjax } from "../../../src/custom_ajax.js";
import { Button } from "@mui/material";
import { multi_lang_helper as ml } from "../../common";
export default function ReviewsPage() {
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
				alert(ml({ en: "something went wrong", fa: "مشکلی رخ داد" }));
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
							ml({
								en: "enter pros seperated with comma",
								fa: "مزایا را به صورت جدا شده توسط ویرگول انگلیسی وارد کنید",
							})
						)
						.split(",")
				),
				cons: JSON.stringify(
					window
						.prompt(
							ml({
								en: "enter cons seperated with comma",
								fa: "معایب را به صورت جدا شده توسط ویرگول انگلیسی وارد کنید",
							})
						)
						.split(",")
				),
				text: window.prompt(
					ml({
						en: "enter the text of your review",
						fa: "متن بررسی خود را وارد کنید",
					})
				),
				time: d.getTime(),
				rating_from_five: Number(
					window.prompt(
						ml({
							en: "enter a number between 1 to 5 as your rating for this product",
							fa: "به این کالا از ۱ تا ۵ امتیاز دهید", //todo check if numners should be english or it doesnt matter
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
