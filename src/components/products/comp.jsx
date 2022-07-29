import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
export default function Products() {
	var nav = useNavigate();
	function ProductItem({ id, name, price }) {
		var [the_image_src, set_the_image_src] = useState(null);
		useEffect(() => {
			customAjax({
				params: {
					task_name: "get_paths_of_images_of_a_product",
					product_id: id,
				},
			}).then((data) => {
				if (data.result.length != 0) {
					set_the_image_src("http://localhost:4000/product_images/" + data["result"][0]);
				} else {
					set_the_image_src(null);
				}
			});
		}, []);
		return (
			<div
				onClick={() => nav("/product/" + id)}
				className="cursor-pointer my-2 w-5/12 block border border-1 border-blue-400 rounded mx-auto relative p-1"
			>
				<div className="w-11/12 h-28 mx-auto my-2 bg-blue-500 rounded flex items-center justify-center">
					{the_image_src === null ? (
						<h1 className="text-center">there is not any image for this product</h1>
					) : (
						<img src={the_image_src} alt="this product's first image" />
					)}
				</div>
				<p className="p-1">
					#{id} : {name}
				</p>
				<b>price : {price} toman</b>
			</div>
		);
	}
	const [products, set_products] = useState([]);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then(
			(data) => {
				set_products(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);
	return (
		<div className="mx-auto border border-blue-400 rounded mt-2 p-2 px-0">
			<h1 className="text-lg">products page</h1>
			<hr />
			<div className="flex flex-wrap ">
				{products.map((product) => {
					return (
						<ProductItem
							id={product.id}
							name={product.name}
							price={product.price}
							key={product.id}
						/>
					);
				})}
			</div>
		</div>
	);
}
