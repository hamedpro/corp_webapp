import { useEffect, useState } from "react";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";
const user_reviews = (props) => {
	var [product, set_product] = useState({});
	var [reviews, set_reviews] = useState([]);
	var [reviews_page, set_reviews_page] = useState(1);
	var [avg_rating, set_avg_rating] = useState("loading");

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
			const average = (numbers) => {
				var total = 0;
				numbers.forEach((number) => (total += number));
				return total / numbers.length;
			};
			set_avg_rating(
				Math.round(average(data.result.map((review) => Number(review.rating_from_five))))
			);
		});
	}
	useEffect(() => {
		fetch_data();
	}, []);

	function ReviewItem(props) {
		return <h1>{JSON.stringify(props)}</h1>;
	}
	function add_new_review() {
		var d = new Date();
		customAjax({
			params: {
				task_name: "new_product_user_review",
				product_id: Number(props.product_id),
				username: window.localStorage.getItem("username"),
				pros: JSON.stringify(window.prompt("enter pros seperated with comma").split(",")),
				cons: JSON.stringify(window.prompt("enter cons seperated with comma").split(",")),
				text: window.prompt("enter the text of your review"),
				time: d.getTime(),
				rating_from_five: Number(
					window.prompt("enter a number between 1 to 5 as your rating for this product")
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
		<>
			<div className="mx-auto border border-blue-400 rounded mt-2 p-2">
				<h1 className="text-lg">the product's user rating:</h1>
				<hr className="mb-2" />
				<div className="border border-blue-400 p-2 rounded">
					<h1>{avg_rating}</h1>
					<span>/5 (rounded)</span>
				</div>
				<h1 className="text-lg inline mr-3">user reviews :</h1>
				<button onClick={add_new_review} className="inline border border-blue-400">
					add new review
				</button>
				{reviews.map((review, index) => {
					function page_indexes(page) {
						var a = [];
						a.push((page - 1) * 3);
						a.push((page - 1) * 3 + 1);
						a.push((page - 1) * 3 + 2);
						return a;
					}
					if (page_indexes(reviews_page).includes(index)) {
						return <ReviewItem key={index} {...review} />;
					} else {
						return null;
					}
				})}

				<div className="mt-2 mx-auto border border-blue-400 rounded p-1 flex">
					<button
						onClick={() => set_reviews_page(reviews_page - 1)}
						className="mx-1 border border-blue-400 flex justify-center items-center p-2"
						disabled={reviews_page - 1 <= 0}
					>
						{"<"}
					</button>
					<button
						onClick={() => set_reviews_page(reviews_page + 1)}
						className="mx-1 border border-blue-400 flex justify-center items-center p-2"
						disabled={
							reviews_page + 1 >
							(reviews.length % 3 == 0 ? reviews.length / 3 : reviews.length / 3 + 1)
						}
					>
						{">"}
					</button>
				</div>
			</div>
		</>
	);
};

export default user_reviews;
