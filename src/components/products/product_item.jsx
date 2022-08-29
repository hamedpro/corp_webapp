import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import NoPhotographyRoundedIcon from "@mui/icons-material/NoPhotographyRounded";
export default function ProductItem({ id, name, price, className = undefined, discount_percent }) {
	//id stands for product id
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
				set_the_image_src(
					"http://" +
						window.location.hostname +
						":4000/product_images/" +
						data["result"][0]
				);
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
			className={
				"p-1 flex flex-col shrink-0 cursor-pointer w-6/12 block border relative border-stone-400 hover:scale-105 hover:z-10 duration-150" +
				(className ? " " + className : "")
			}
			onClick={() => nav("/products/" + id)}
		>
			<div className="relative w-full h-1/2 mx-auto flex items-center justify-center">
				{the_image_src === null ? (
					<div className="h-full rounded-lg bg-blue-400 w-full flex justify-center items-center">
						<NoPhotographyRoundedIcon className="text-white" />
					</div>
				) : (
					<div className="h-full rounded-lg bg-blue-400 w-full flex justify-center items-center">
						<img
							className="h-full"
							style={{ objectFit: "contain" }}
							src={the_image_src}
							alt="this product's first image"
						/>
					</div>
				)}
			</div>
			<p className="mx-auto mx-1 mt-1">{name}</p>
			<div className="flex flex-col">
				{discount_percent === 0 ? (
					<>{price} toman</>
				) : (
					<>
						{/* tell the admin this discounted price is rounded */}
						{/* convert all prices to toman in all app  */}
						<span className="line-through text-sm">{price} toman</span>
						<b className="">
							-{discount_percent}% :{" "}
							{Math.round((price * ((100 - discount_percent) / 100)) / 1000) * 1000}
						</b>
					</>
				)}
			</div>
		</div>
	);
}
