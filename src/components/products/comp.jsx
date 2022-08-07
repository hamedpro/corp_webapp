import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
import ProductItem from "./product_item";
export default function Products() {
	var nav = useNavigate();
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
		<div className="mx-auto border border-blue-400 mt-2 p-2 mx-2">
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
