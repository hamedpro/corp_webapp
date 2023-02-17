import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gen_link_to_file } from "../../../common";
import { customAjax } from "../../../custom_ajax";
import { ArrowTitle } from "../../ArrowTitle";
import { ImageSlider } from "../../image_slider/comp";

export const FullScreenImageSlider = () => {
	var nav = useNavigate();
	var { product_id } = useParams();
	var [image_sources, set_image_sources] = useState();
	async function get_data() {
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
	}
	useEffect(() => {
		get_data();
	}, []);
	if (image_sources === undefined) return null;
	return (
		<div className="w-full h-full fixed bg-blue-400 z-50 left-0 top-0">
			<ArrowTitle
				title="بازگشت به صفحه کالا"
				onClick={() => nav(`/products/${product_id}`)}
			/>
			{image_sources.length == 0 ? (
				<div className="w-full h-20 bg-blue-400 text-white flex justify-center items-center">
					برای این محصول هیچ تصویری بارگذاری نشده است
				</div>
			) : (
				<ImageSlider image_sources={image_sources} />
			)}
		</div>
	);
};