import React, { useEffect, useState } from "react";
import { customAjax } from "../../src/custom_ajax.js";
import Button from "@mui/material/Button";
import { TotalRating } from "./TotalRating";
import { ReviewItem } from "./ReviewItem";
import { useNavigate } from "react-router-dom";
import { Section } from "./Section";
import { multi_lang_helper as ml } from "../common.js";
export const UserReviews = (props) => {
	var [product, set_product] = useState({});
	var [reviews, set_reviews] = useState([]);
	var verified_reviews = () => reviews.filter((review) => review.verification_status === "true");
	var nav = useNavigate();
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then((data) => {
			set_product(data.result.filter((product) => (product.id = props.product_id))[0]);
		});
		customAjax({
			params: {
				task_name: "get_all_product_reviews",
				product_id: Number(props.product_id),
			},
		}).then((data) => {
			set_reviews(data.result);
		});
	}
	useEffect(() => {
		fetch_data();
	}, []);
	//todo check whether this product is written by someone who
	//has bought this product from here or not
	//todo add ability to add media to user reviews and like them
	//todo add faq to all website
	//todo add question ask section to every product
	//todo show related products of every product
	return (
		<>
			<TotalRating reviews={verified_reviews()} />
			{verified_reviews().length === 0 ? (
				<Section
					title={ml({
						en: "user reviews:",
						fa: "بررسی های کاربران :",
					})}
					className="mx-1 mt-2"
				>
					<div className="w-full flex justify-center flex-col py-3">
						<h1 className="text-center">
							{ml({
								en: "there is not any review submitted",
								fa: "هنوز هیچ بررسی برای این محصول ثبت نشده است",
							})}
						</h1>
						<Button
							variant="contained"
							size="small"
							sx={{ minWidth: 0, mx: "auto", mt: 1 }}
							className="w-2/3"
							onClick={() => nav("/products/" + props.product_id + "/reviews")}
						>
							{ml({
								en: "submit the first review",
								fa: "ثبت اولین بررسی برای محصول",
							})}
						</Button>
					</div>
				</Section>
			) : (
				<>
					<Section
						title={ml({
							en: "user reviews :",
							fa: "بررسی های کاربران:",
						})}
						className="mx-1 mt-2"
					>
						<div
							className=" mx-2 mb-1 flex  h-40 space-x-2"
							style={{ overflowX: "scroll" }}
						>
							{verified_reviews().map((review, index) => {
								if (index <= 2 && index + 1 <= verified_reviews().length) {
									return (
										<React.Fragment key={index}>
											<ReviewItem
												review={review}
												className="shrink-0 mr-2 w-2/3"
											/>
										</React.Fragment>
									);
								}
							})}
							<div className="h-full bg-blue-500 text-white flex flex-col shrink-0 items-center justify-center px-4">
								<h1 className="mb-3">
									{ml({
										en: "want to see all reviews? ",
										fa: "آیا میخواهید همه بررسی ها را ببینید؟",
									})}
								</h1>
								<Button
									sx={{ color: "white", borderColor: "gray" }}
									variant="outlined"
									size="small"
									onClick={() => nav(`/products/${props.product_id}/reviews`)}
								>
									{" "}
									{/* todo improve quality of translations  */}
									{ml({
										en: "see all reviews",
										fa: "مشاهده همه بررسی ها",
									})}
								</Button>
							</div>
						</div>
					</Section>
					<Section
						title={ml({ en: "add a new review", fa: "اضافه کردن یک بررسی جدید" })}
						className="mt-2 mx-1"
					>
						<div className=" mx-2 bg-blue-500 p-3 h-full flex flex-col justify-center items-center">
							<h1 className="text-white w-1/2 text-center mb-2">
								{ml({
									en: "do you want to share your exprience about this product",
									fa: "آیا تمایل دارید تجربه کاربری خود را با ما در میان بگذارید ؟",
								})}{" "}
								?{" "}
							</h1>
							<Button
								sx={{ color: "white", borderColor: "gray" }}
								variant="outlined"
								size="small"
								onClick={() =>
									nav(`/products/${props.product_id}/new-product-review`)
								}
							>
								{ml({
									en: "add a new review",
									fa: "اصافه کردم یک بررسی جدید",
								})}
							</Button>
						</div>
					</Section>
				</>
			)}
		</>
	);
};
