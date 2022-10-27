import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import NoPhotographyRoundedIcon from "@mui/icons-material/NoPhotographyRounded";
import { gen_link_to_file, multi_lang_helper as ml, trim_text_if_its_long } from "../../common.js";
import { Category, InfoRounded } from "@mui/icons-material";
export default function ProductItem({ id, name, price, className = undefined, discount_percent, description="" ,category=""}) {
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
				set_the_image_src(gen_link_to_file("./product_images/" + data["result"][0]));
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
				"p-1 flex flex-col shrink-0 cursor-pointer w-1/2 md:w-1/3 block border relative border-stone-400 hover:scale-105 hover:z-10 duration-150" +
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
							alt={ml({
								en: "this product's first image",
								fa : ""
							})}
						/>
					</div>
				)}
			</div>
			<div className="mx-auto mx-1 mt-1">
				<h1 className="text-3xl">{name}</h1>
				<div className="flex space-x-1 mt-3">
					<InfoRounded sx={{color:"darkblue"}}/> <span className="text-lg break-all">{trim_text_if_its_long(description,50)}</span>
				</div>
				<div className="flex items-center space-x-1">
					<Category sx={{color:"darkblue"}}/> <span className="text-lg">{category}</span>
				</div>
			</div>
			<div className="flex flex-col mt-auto p-1">
				{discount_percent === 0 ? (
					<>
						{price} {ml({ en: "toman", fa: "تومن" })}
					</>
				) : (
					<>
						{/* tell the admin this discounted price is rounded */}
						{/* convert all prices to toman in all app  */}
						<span className="line-through text-sm">
							{price} {ml({ en: "toman", fa: "تومن" })}
						</span>
						<b className="">
							-{discount_percent}% :{" "}
							{Math.round((price * ((100 - discount_percent) / 100)) / 1000) * 1000} {ml({ en: "toman", fa: "تومن" })}
						</b>
					</>
				)}
			</div>
		</div>
	);
}
