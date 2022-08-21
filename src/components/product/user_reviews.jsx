import React, { useEffect, useState } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import Button from "@mui/material/Button";
import TotalRating from "./total_rating";
import LinkLikeP from "../LinkLikeP/comp";
import ReviewItem from "./review_item.jsx";
import { useNavigate } from "react-router-dom";
import Section from "../section/comp.jsx";
const user_reviews = (props) => {
	var [product, set_product] = useState({});
	var [reviews, set_reviews] = useState([]);
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
				task_name: "get_user_reviews",
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
			<TotalRating reviews={reviews} />
			{reviews.length === 0 ? (
				<>
					<h1>user reviews:</h1>
					<hr />
					<div className="w-full flex justify-center flex-col py-3">
						<h1 className="text-center">there is not any review submitted</h1>
						<Button
							variant="contained"
							size="small"
							sx={{ minWidth: 0, mx: "auto", mt: 1 }}
							className="w-2/3"
							onClick={() => nav("/products/" + props.product_id + "/reviews")}
						>
							submit the first review
						</Button>
					</div>
				</>
			) : (
				<>
					<Section title="user reviews :">
						<div
							className=" mx-2 mb-1 flex  h-40 space-x-2"
							style={{ overflowX: "scroll" }}
						>
							{reviews.map((review, index) => {
								if (index <= 2 && index + 1 <= reviews.length) {
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
								<h1 className="mb-3">want to see all reviews? </h1>
								<Button
									sx={{ color: "white", borderColor: "gray" }}
									variant="outlined"
									size="small"
									onClick={() => nav(`/products/${props.product_id}/reviews`)}
								>
									see all reviews
								</Button>
							</div>
						</div>
					</Section>
					<Section title="add a new review">
						<div className=" mx-2 bg-blue-500 p-3 h-full flex flex-col justify-center items-center">
							<h1 className="text-white w-1/2 text-center mb-2">
								do you want to share your exprience about this product ?{" "}
							</h1>
							<Button
								sx={{ color: "white", borderColor: "gray" }}
								variant="outlined"
								size="small"
								onClick={() => nav(`/products/${props.product_id}/new-user-review`)}
							>
								add a new review
							</Button>
						</div>
					</Section>
				</>
			)}
		</>
	);
};

export default user_reviews;
