import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import "./styles.css";
import UsersReviews from "./user_reviews";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AddToShoppingBagBar from "./AddToShoppingBagBar";
export default function Product() {
	var product_id = useParams().product_id;
	const [product, set_product] = useState({
		id: "loading ...",
		name: "loading ...",
		description: "loading ...",
		price: "loading ...",
		product_specs: "[]",
	});

	function upload_files() {
		var files = document.getElementById("files_input").files;
		var form = new FormData();
		for (var i = 0; i < files.length; i++) {
			form.append(i, files[i]);
		}
		fetch("http://localhost:4000?task_name=upload_product_images&product_id=" + product_id, {
			method: "POST",
			body: form,
		});
	}
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then(
			(data) => {
				set_product(data.result.filter((i) => i.id == Number(product_id))[0]);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(() => {
		fetch_data();
	}, []);
	var [image_sources, set_image_sources] = useState([]);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_paths_of_images_of_a_product",
				product_id,
			},
		}).then((data) => {
			set_image_sources(
				data.result.map((file_name) => "http://localhost:4000/product_images/" + file_name)
			);
		});
	}, []);
	var [current_image_index, set_current_image_index] = useState(0);
	function image_next() {
		if (current_image_index + 1 <= image_sources.length - 1) {
			set_current_image_index(current_image_index + 1);
		} else {
			set_current_image_index(0);
		}
	}
	function image_back() {
		if (current_image_index - 1 >= 0) {
			set_current_image_index(current_image_index - 1);
		} else {
			set_current_image_index(image_sources.length - 1);
		}
	}
	return (
		<>
			<div className="mx-auto border border-blue-400 mt-2 p-2 mx-1">
				<div className="relative flex justify-center align-center relative mx-auto mt-0 mb-1 rounded bg-blue-100 min-h-48 w-11/12">
					<button
						className="product_page__image_back"
						onClick={() => {
							image_back();
						}}
					>
						<ArrowBackIosNewRoundedIcon />
					</button>
					{image_sources.length == 0 ? (
						<>there is not any product image uploaded for this product</>
					) : (
						<img
							className="w-full"
							src={image_sources[current_image_index]}
							alt="product image"
						/>
					)}
					<button
						className="product_page__image_next"
						onClick={() => {
							image_next();
						}}
					>
						<ArrowForwardIosRoundedIcon />
					</button>
				</div>
				<div className="mx-2 w-full mt-2">
					<h1>
						#{product.id} : {product.name}
					</h1>
				</div>
				<AddToShoppingBagBar price={product.price} product_id={product.id} />
			</div>

			<div className="mx-auto border border-blue-400 mx-1 mt-2 p-2">
				<h1 className="mb-1">description:</h1>
				<hr />
				<p className="mt-1">{product.description}</p>
			</div>
			<div className="mx-auto border border-blue-400 mx-1 mt-2 p-2">
				<h1 className="text-lg">product specs:</h1>
				<hr className="mb-2" />
				{/* add option for report data incorrect which opens pop up to open a new support ticket */}
				{JSON.parse(product.product_specs).map((spec) => {
					return (
						<div className="flex" key={spec.id}>
							<p className="text-stone-600 mr-1">{spec.key}</p>:
							<p className="ml-1">{spec.value}</p>
						</div>
					);
				})}
			</div>

			<UsersReviews product_id={Number(product_id)} />
		</>
	);
}
