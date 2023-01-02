import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import ProductItem from "./product_item";
import Section from "../section/comp";
import { FilterAltRounded, SortRounded } from "@mui/icons-material";
import { SortingModal } from "./sorting_modal.jsx";
import { FilteringModal } from "./filtering_modal.jsx";
import { multi_lang_helper as ml } from "../../common.js";
export default function Products() {
	var nav = useNavigate();
	const [products_to_show, set_products_to_show] = useState([]);
	var [is_sorting_modal_visible, set_is_sorting_modal_visible] = useState(false);
	var [is_filtering_modal_visible, set_is_filtering_modal_visible] = useState(false);
	var default_filter_options = {
		minimumPrice: null,
		maximumPrice: null,
		just_with_image: false,
	};
	var [filter_options, set_filter_options] = useState(default_filter_options);
	const [sort_type, set_sort_type] = useState("default");
	function filtered_products(products) {
		var tmp = products;

		if (filter_options.minimumPrice !== null) {
			tmp = tmp.filter((product) => product.price >= filter_options.minimumPrice);
		}
		if (filter_options.maximumPrice !== null) {
			tmp = tmp.filter((product) => product.price <= filter_options.maximumPrice);
		}
		if (filter_options.just_with_image) {
			tmp = tmp.filter((product) => product.images_path_names.length !== 0);
		}
		return tmp;
	}
	function sorted_products(products) {
		var cloned_products = products.map((i) => i);
		switch (sort_type) {
			case "default":
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
	useEffect(fetch_data, [filter_options, sort_type]);
	return (
		<>
			<SortingModal
				open={is_sorting_modal_visible}
				hideFn={() => set_is_sorting_modal_visible(false)}
				setSortType={set_sort_type}
				sortType={sort_type}
			/>
			<FilteringModal
				open={is_filtering_modal_visible}
				hideFn={() => set_is_filtering_modal_visible(false)}
				filterOptions={filter_options}
				setFilterOptions={set_filter_options}
				default_filter_options={default_filter_options}
			/>
			<Section title={ml({ en: "products", fa: "محصولات" })} className="mx-1 mt-1">
				<div className="flex mx-2 space-x-2">
					<button
						className="flex hover:bg-blue-400 rounded px-1"
						onClick={() => set_is_sorting_modal_visible(true)}
					>
						<SortRounded />
						{ml({
							en: "sort products",
							fa: "ترتیب نمایش",
						})}
					</button>

					<button
						className="flex hover:bg-blue-400 rounded px-1"
						onClick={() => set_is_filtering_modal_visible(true)}
					>
						<FilterAltRounded />
						{ml({
							en: "filter product",
							fa: "فیلتر کردن نتایج",
						})}
					</button>
				</div>
				<div className="flex justify-between mx-2 mt-4 mb-2 text-sm border-b border-stone-400 ">
					<p className="text-stone-500">
						{ml({
							en: "filtered products",
							fa: "محصولات فیلتر شده",
						})}
					</p>
					<p className="text-stone-500">
						{products_to_show.length}{" "}
						{ml({
							en: "product",
							fa: "محصول",
						})}
					</p>
				</div>
				<div className="flex flex-wrap justify-start mx-2">
					{products_to_show.map((product) => {
						return (
							<ProductItem
								id={product.id}
								name={product.name}
								price={product.price}
								key={product.id}
								discount_percent={product.discount_percent}
								className="bg-white"
								description={product.description}
							/>
						);
					})}
				</div>
			</Section>
		</>
	);
}
