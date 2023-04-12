import React, { useEffect, useState } from "react";
import { get_data_pair } from "../../api/client";
import { customAjax } from "../custom_ajax";
import { CustomImageSlider } from "./CustomImageSlider";
export const ContentSlider = ({}) => {
	var [images_sources, set_images_sources] = useState();

	async function get_data() {
		//getting what to show from paired_data collection
		var content_slider_content = (await get_data_pair("content_slider_content")) || {
			product_ids: [],
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
				set_images_sources((prev) => [
					...(prev || []),
					new URL(`/files/${JSON.parse(product.image_file_ids)[0]}`, vite_api_endpoint)
						.href,
				]);
			}
		});

		content_slider_content.image_file_ids.forEach((file_id) => {
			set_images_sources((prev) => [
				...(prev || []),
				new URL(`/files/${file_id}`, vite_api_endpoint).href,
			]);
		});
	}
	useEffect(() => {
		get_data();
	}, []);
	if (images_sources === undefined) return <h1>loading ...</h1>;
	return (
		<div
			className="w-full py-2 bg-gray-100 text-white"
			style={{ width: "100vw", maxHeight: "55vh" }}
		>
			{images_sources.length === 0 ? (
				<div className="w-full h-full flex items-center justify-center text-gray-700">
					<h1>هیچ موردی برای نمایش ثبت نشده است </h1>
				</div>
			) : (
				<CustomImageSlider images_sources={images_sources.reverse()} />
			)}
		</div>
	);
};
