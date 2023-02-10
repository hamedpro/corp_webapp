import React, { useContext, useEffect, useState } from "react";
import { get_collection, get_data_pair } from "../../../api/client";
import { customAjax } from "../../custom_ajax";

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
		}, 3000);
	}, []);
	function idk() {
		// right now i dont know what i should call this function !!!!
		var tmp = counter;
		while (!(tmp < items_to_show.length)) {
			tmp -= items_to_show.length;
		}
		//console.log(tmp);
		return tmp;
	}
	if (items_to_show === undefined) return <h1>loading ...</h1>;
	return (
		<div className="w-full h-36 bg-sky-700 text-white">
			{items_to_show.length === 0
				? "there is not any items to show"
				: "item is : " + JSON.stringify(items_to_show[idk()])}
		</div>
	);
};
