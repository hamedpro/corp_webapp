import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import ProductItem from "./product_item";
import Section from "../section/comp";
import { FilterAltRounded, FilterRounded, SortRounded } from "@mui/icons-material";
export default function Products() {
	var nav = useNavigate();
	const [products_to_show, set_products_to_show] = useState([]);
	const [sort_type, set_sort_type] = useState(null);
	var [is_sorting_modal_visible, set_is_sorting_modal_visible] = useState(true);
	var [is_filtering_modal_visible, set_is_filtering_modal_visible] = useState(false);
	var [filter_options, set_filter_options] = useState({});
	function filtered_products(products) {
		return products;
	}
	function sorted_products(products) {
		var cloned_products = products.map((i) => i);
		switch (sort_type) {
			case null:
				return products;
				break;
			case "expensive_to_cheap":
				cloned_products.sort((i1, i2) => i2.price - i1.price);
				return cloned_products;
				break;
			case "cheap_to_expensive":
				cloned_products.sort((i1, i2) => i1.price - i2.price);
				return cloned_products;
				break;
		}
		return products;
	}
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then(
			(data) => {
				set_products_to_show(sorted_products(filtered_products(data.result)));
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	return (
		<>
			{is_sorting_modal_visible ? (
				<div className="fixed bg-blue-500 w-full h-3/4 bottom-0 left-0 z-30 rounded-t"></div>
			) : null}
			{is_filtering_modal_visible ? <div></div> : null}
			<Section title="products">
				<div className="flex mx-2 space-x-2">
					<button className="flex hover:bg-blue-400 rounded px-1">
						<SortRounded />
						sort products
					</button>

					<button className="flex hover:bg-blue-400 rounded px-1">
						<FilterAltRounded />
						filter product
					</button>
				</div>
				<div className="flex justify-between mx-2 mt-4 mb-2 text-sm border-b border-stone-400 ">
					<p className="text-stone-500">filtered products</p>
					<p className="text-stone-500">{products_to_show.length} product</p>
				</div>
				<div className="flex flex-wrap justify-start mx-2">
					{products_to_show.map((product) => {
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
			</Section>
		</>
	);
}
