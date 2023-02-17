import React, { useEffect, useState } from "react";
import { get_collection, get_data_pair } from "../../../api/client";
import ProductItem from "../products/product_item";
import { customAjax } from "../../custom_ajax";
import { WritingSquare } from "../root/comp";
function Item({ data, hidden }) {
	if (hidden) return;
	if (data.type === "image") {
		return (
			<img
				className="h-full"
				src={new URL(`/files/${data.data.file_id}`, vite_api_endpoint)}
			/>
		);
	}
	if (data.type === "product") {
		return (
			<ProductItem
				id={data.data.id}
				name={data.data.name}
				price={data.data.price}
				className="overflow-hidden bg-blue-300 text-black rounded-xl"
				description={data.data.description}
				just_first_image={true}
			/>
		);
	}
	if (data.type === "writing") {
		return <WritingSquare writing={data.data} />;
	}
}
export const ContentSlider = ({}) => {
	var [items_to_show, set_items_to_show] = useState();
	var [counter, set_counter] = useState(0);
	async function get_data() {
		let items_to_show = [];
		//getting what to show from paired_data collection
		var content_slider_content = (await get_data_pair("content_slider_content")) || {
			product_ids: [],
			writing_ids: [],
			image_file_ids: [],
		};

		//gettings products
		var tmp = await customAjax({
			params: {
				task_name: "get_products",
			},
		});
		tmp.result.forEach((product) => {
			if (content_slider_content.product_ids.includes(product.id)) {
				items_to_show.push({ type: "product", data: product });
			}
		});
		//getting writings
		var tmp = await get_collection({
			collection_name: "writings",
			filters: {},
		});
		tmp.data.forEach((writing) => {
			if (content_slider_content.writing_ids.includes(writing._id)) {
				items_to_show.push({ type: "writing", data: writing });
			}
		});

		content_slider_content.image_file_ids.forEach((file_id) => {
			items_to_show.push({ type: "image", data: { file_id } });
		});
		set_items_to_show(items_to_show);
	}

	useEffect(() => {
		get_data();
		setInterval(() => {
			set_counter((prev) => prev + 1);
		}, 5000);
	}, []);
	function idk() {
		// right now i dont know what i should call this function !!!!
		var tmp = counter;
		while (!(tmp < items_to_show.length)) {
			tmp -= items_to_show.length;
		}
		return tmp;
	}
	if (items_to_show === undefined) return <h1>loading ...</h1>;
	return (
		<div
			className="w-full py-2 bg-gray-100 text-white flex justify-center"
			style={{ height: "25vw" }}
		>
			{items_to_show.length === 0 ? (
				<div className="w-full h-full flex items-center justify-center text-gray-700">
					<h1>هیچ موردی برای نمایش ثبت نشده است </h1>
				</div>
			) : (
				items_to_show.map((item, index) => {
					return <Item data={item} hidden={index !== idk()} />;
				})
			)}
		</div>
	);
};
