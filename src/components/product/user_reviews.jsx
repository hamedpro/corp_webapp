import React, { useEffect, useState } from "react";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
import Button from "@mui/material/Button";
import TotalRating from "./total_rating";
import LinkLikeP from "../LinkLikeP/comp";
import ReviewItem from "./review_item.jsx";
import { useNavigate } from "react-router-dom";
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

	if (reviews.length == 0) {
		return (
			<div className="border border-blue-400 mx-1 mt-2 px-1 py-2">
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
			</div>
		);
	} else {
		return (
			<>
				<div className="mx-auto border border-blue-400  mt-2 p-2 mx-1">
					<TotalRating reviews={reviews} />
					<div className="flex space-between">
						<h1 className="text-lg inline mr-3">user reviews :</h1>
						<LinkLikeP
							link={`/products/${props.product_id}/reviews`}
							className="text-blue-600 underline ml-auto"
						>
							see more
						</LinkLikeP>
					</div>
					<div className="flex w-full h-40 space-x-2" style={{ overflowX: "scroll" }}>
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
						<div className="w-2/3 border bg-blue-400 text-white h-full flex justify-center items-center flex-col shrink-0">
							<h1 className="text-center mb-2">want to share your exprience ?</h1>
							<Button
								size="small"
								variant="contained"
								onClick={() => nav(`/products/${props.product_id}/reviews`)}
							>
								add a new review
							</Button>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export default user_reviews;
