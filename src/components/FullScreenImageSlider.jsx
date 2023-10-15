import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowTitle } from "./ArrowTitle";
import { ImageSlider } from "./ImageSlider";
import { CustomImageSlider } from "./CustomImageSlider";
import { calc_all_paths, calc_file_url } from "freeflow-core/dist/utils";
import { context } from "freeflow-react";

export const FullScreenImageSlider = ({ image_urls, product_id }) => {
	var nav = useNavigate();
	return (
		<div className="w-full h-full fixed bg-blue-400 z-50 left-0 top-0">
			<ArrowTitle
				title="بازگشت به صفحه کالا"
				onClick={() => nav(`/products/${product_id}`)}
			/>
			<div className="flex justify-center items-center h-full w-full">
				<div className="w-full h-1/2 bg-blue-400 text-white flex justify-center items-center">
					{image_urls.length === 0 ? (
						"برای این محصول هیچ تصویری بارگذاری نشده است"
					) : (
						<CustomImageSlider images_sources={image_urls} />
					)}
				</div>
			</div>
		</div>
	);
};
