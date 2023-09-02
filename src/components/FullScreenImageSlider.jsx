import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowTitle } from "./ArrowTitle";
import { ImageSlider } from "./ImageSlider";
import { CustomImageSlider } from "./CustomImageSlider";

export const FullScreenImageSlider = () => {
	var nav = useNavigate();
	var { product_id } = useParams();
	var [image_sources, set_image_sources] = useState();
	async function get_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then((data) => {
			set_image_sources(
				JSON.parse(
					data.result.find((product) => product.id === Number(product_id)).image_file_ids
				).map((image_file_id) => new URL(`/files/${image_file_id}`, vite_api_endpoint).href)
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
			<div className="flex justify-center items-center h-full w-full">
				<div className="w-full h-1/2 bg-blue-400 text-white flex justify-center items-center">
					{image_sources.length === 0 ? (
						"برای این محصول هیچ تصویری بارگذاری نشده است"
					) : (
						<CustomImageSlider images_sources={image_sources} />
					)}
				</div>
			</div>
		</div>
	);
};
