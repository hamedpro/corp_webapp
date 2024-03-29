import { useContext, useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import { Section } from "./Section";
import { FilterAltRounded, SortRounded } from "@mui/icons-material";
import { SortingModal } from "./SortingModal";
import { FilteringModal } from "./FilteringModal";
import { context } from "freeflow-react";
export function Products() {
	var { cache } = useContext(context);
	var products = cache.filter((ci) => ci.thing.type === "product");
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
			tmp = tmp.filter((product) => product.thing.value.price >= filter_options.minimumPrice);
		}
		if (filter_options.maximumPrice !== null) {
			tmp = tmp.filter((product) => product.thing.value.price <= filter_options.maximumPrice);
		}
		if (filter_options.just_with_image) {
			tmp = tmp.filter((product) => product.thing.value.image_file_ids.length !== 0);
		}
		return tmp;
	}
	function sorted_products(products) {
		var cloned_products = [...products];
		switch (sort_type) {
			case "default":
				return products;
				break;
			case "expensive_to_cheap":
				cloned_products.sort((i1, i2) => i2.thing.value.price - i1.thing.value.price);
				return cloned_products;
				break;
			case "cheap_to_expensive":
				cloned_products.sort((i1, i2) => i1.thing.value.price - i2.thing.value.price);
				return cloned_products;
				break;
		}
		return products;
	}
	var products_to_show = sorted_products(filtered_products(products));

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
			<Section
				title={"محصولات"}
				className="mx-1 mt-1"
			>
				<div className="flex mx-2 space-x-2">
					<button
						className="flex hover:bg-blue-400 rounded px-1"
						onClick={() => set_is_sorting_modal_visible(true)}
					>
						<SortRounded />
						{"ترتیب نمایش"}
					</button>

					<button
						className="flex hover:bg-blue-400 rounded px-1"
						onClick={() => set_is_filtering_modal_visible(true)}
					>
						<FilterAltRounded />
						{"فیلتر کردن نتایج"}
					</button>
				</div>
				<div className="flex justify-between mx-2 mt-4 mb-2 text-sm border-b border-stone-400 ">
					<p className="text-stone-500">{"محصولات فیلتر شده"}</p>
					<p className="text-stone-500">
						{products_to_show.length} {"محصول"}
					</p>
				</div>
				<div className="flex flex-wrap justify-start mx-2">
					{products_to_show.map((product) => {
						return (
							<ProductItem
								product={product}
								key={product.thing_id}
								className="bg-white"
							/>
						);
					})}
				</div>
			</Section>
		</>
	);
}
