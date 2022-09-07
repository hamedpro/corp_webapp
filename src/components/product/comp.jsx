import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import "./styles.css";
import UsersReviews from "./user_reviews";
import AddToShoppingBagBar from "./AddToShoppingBagBar";
import Section from "../section/comp.jsx";
import { ImageSlider } from "../image_slider/comp.jsx";
import { gen_link_to_file, multi_lang_helper as ml } from "../../common.js";
export default function Product() {
	var product_id = useParams().product_id;
	var translated_loading = ml({
		en: "loading ...",
		fa: "در حال بارگذاری",
	});
	const [product, set_product] = useState({
		id: translated_loading,
		name: translated_loading,
		description: translated_loading,
		price: translated_loading,
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
				data.result.map((file_name) => gen_link_to_file("./product_images/" + file_name))
			);
		});
	}, []);

	return (
		<>
			<div className="flex flex-col md:flex-row mx-auto border border-blue-400 mt-2 p-2 mx-1">
				<div className="md:w-1/2">
					{image_sources.length == 0 ? (
						<div className="w-full h-20 bg-blue-400 text-white flex justify-center items-center">
							{ml({
								en: "there is not any product image uploaded for this product",
								fa: "برای این محصول هیچ تصویری بارگذاری نشده است",
							})}
						</div>
					) : (
						<ImageSlider image_sources={image_sources} />
					)}
				</div>

				<div className="flex flex-col md:w-1/2 p-2 space-between">
					<div className="mx-2 w-full mt-2">
						<h1>
							#{product.id} : {product.name}
						</h1>
					</div>
					<h1 className="m-2 my-1">description : {product.description}</h1>
					<h1 className="m-2 my-1">category : {product.category}</h1>
					<AddToShoppingBagBar price={product.price} product_id={product.id} />
				</div>
			</div>
			{/* todo add a div h full w full into Section comp and inject styles into that */}
			<Section
				title={ml({
					en: "description",
					fa: "معرفی محصول :",
				})}
			>
				<div className="mx-2">
					<p className="mt-1">{product.description}</p>
				</div>
			</Section>
			<Section
				title={ml({
					en: "product specifications:",
					fa: "مشخصات محصول :",
				})}
			>
				<div className="mx-2">
					{/*todo add option for report data incorrect which opens pop up to open a new support ticket */}
					{JSON.parse(product.product_specs).map((spec) => {
						return (
							<div className="flex" key={spec.id}>
								<p className="text-stone-600 mr-1">{spec.key}</p>:
								<p className="ml-1">{spec.value}</p>
							</div>
						);
					})}
				</div>
			</Section>

			<UsersReviews product_id={Number(product_id)} />
		</>
	);
}
