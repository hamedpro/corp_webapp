import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax.js";
import { Button } from "@mui/material";
import NoPhotographyRoundedIcon from "@mui/icons-material/NoPhotographyRounded";
export default function ProductItem({ id, name, price }) {
	var nav = useNavigate();
	var [the_image_src, set_the_image_src] = useState(null);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_paths_of_images_of_a_product",
				product_id: id,
			},
		}).then((data) => {
			if (data.result.length != 0) {
				set_the_image_src("http://localhost:4000/product_images/" + data["result"][0]);
			} else {
				set_the_image_src(null);
			}
		});
	}, []);
	function add_to_shopping_bag(id) {
		alert("this feature is not implented yet");
	}
	return (
		<div
			className="cursor-pointer w-6/12 block border mx-auto relative border-stone-200 hover:scale-105 hover:z-10 hover:bg-white"
			onClick={() => nav("/products/" + id)}
		>
			<div className="relative border w-full min-h-16 mx-auto bg-blue-500 flex items-center justify-center">
				{the_image_src === null ? (
					<div className="h-24 flex justify-center items-center">
						<NoPhotographyRoundedIcon className="text-white" />
					</div>
				) : (
					<img
						className="w-full rounded-t"
						src={the_image_src}
						alt="this product's first image"
					/>
				)}
			</div>
			<p className="mx-auto mx-1 mt-1">{name}</p>
			<div className="flex min-h-0 h-8 p-1">{price} toman</div>
		</div>
	);
}
