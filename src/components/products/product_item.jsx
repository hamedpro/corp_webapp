import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import NoPhotographyRoundedIcon from "@mui/icons-material/NoPhotographyRounded";
import { gen_link_to_file, multi_lang_helper as ml, trim_text_if_its_long } from "../../common.js";
import { Category, InfoRounded, MoneyRounded, SellRounded } from "@mui/icons-material";
import { custom_axios } from "../../../api/client.js";
import axios from "axios";
export default function ProductItem({
	beforeOnClick = () => {},
	id,
	name,
	price,
	className = undefined,
	description = "",
}) {
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
				var low_quality_image = new Image();
				custom_axios({
					data: {
						task_name: "get_low_quality_product_image",
						image_filename: data["result"][0],
					},
					responseType: "blob",
				})
					.then((response) => {
						set_the_image_src(URL.createObjectURL(response.data));
					})
					.then(() => {
						axios({
							url: gen_link_to_file("./product_images/" + data["result"][0]),
							method: "get",
							responseType: "blob",
						}).then((response) => {
							set_the_image_src(URL.createObjectURL(response.data));
						});
					});
			} else {
				set_the_image_src(null);
			}
		});
	}, []);
	function add_to_shopping_bag(id) {
		alert(
			ml({ en: "this feature is not implented yet", fa: "این قابلیت هنوز اضافه نشده است" })
		);
		//todo this feature is not implented yet and messages like this
	}
	return (
		<div
			className={
				"w-1/2 sm:w-1/4 p-1 flex flex-col shrink-0 cursor-pointer border relative border-stone-400 hover:scale-105 hover:z-10 duration-150" +
				(className ? " " + className : "")
			}
			onClick={() => {
				beforeOnClick();
				nav("/products/" + id);
			}}
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
							alt={ml({
								en: "this product's first image",
								fa: "",
							})}
						/>
					</div>
				)}
			</div>
			<div className=" mt-1">
				<h1 className="text-3xl">{name}</h1>
				<div className="flex space-x-1 mt-3">
					<InfoRounded sx={{ color: "darkblue" }} className="pt-1" />{" "}
					<span className="text-lg break-all">
						{trim_text_if_its_long(description, 50)}
					</span>
				</div>
			</div>
			<div className=" mt-1">
				<div className="flex space-x-1 mt-3">
					<SellRounded sx={{ color: "darkblue" }} className="pt-1" />{" "}
					<span className="text-lg break-all">{price} تومن</span>
				</div>
			</div>
		</div>
	);
}
