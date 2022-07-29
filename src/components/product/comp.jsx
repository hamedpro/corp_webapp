import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
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
			<div className="mx-auto border border-blue-400 rounded mt-2 p-2">
				<div className="flex justify-center align-center relative mx-auto mt-0 mb-1 rounded bg-blue-100 h-48 w-full">
					<button
						onClick={() => {
							image_back();
						}}
					>
						back
					</button>
					{image_sources.length == 0 ? (
						<>there is not any product image uploaded for this product</>
					) : (
						<img
							className="h-full"
							src={image_sources[current_image_index]}
							alt="product image"
						/>
					)}
					<button
						onClick={() => {
							image_next();
						}}
					>
						next
					</button>
				</div>
				<h1>product page</h1>
				<hr />
				<p>product id : {product.id}</p>
				<p>product name : {product.name}</p>
				<p>product description : {product.description}</p>
				<p>product price : {product.price}</p>
			</div>
			<div className="mx-auto border border-blue-400 rounded mt-2 p-2">
				<h1 className="text-lg">product specs:</h1>
				<hr className="mb-2" />

				<table className="custom_border">
					<tbody>
						<tr>
							<th>key</th>
							<th>value</th>
						</tr>
						{JSON.parse(product.product_specs).map((spec) => {
							return (
								<tr key={spec.id}>
									<td>{spec.key}</td>
									<td>{spec.value}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="mx-auto border border-blue-400 rounded mt-2 p-2">
				<h1 className="text-lg">product specs:</h1>
				<hr className="mb-2" />
			</div>
		</>
	);
}
