import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../custom_ajax";
import NoPhotographyRoundedIcon from "@mui/icons-material/NoPhotographyRounded";
import { multi_lang_helper as ml, trim_text_if_its_long } from "../common.js";
import { InfoRounded, SellRounded } from "@mui/icons-material";
import { custom_axios } from "../../api/client.js";
import { custom_editorjs_to_jsx } from "../../jsx_helpers";
export function ProductItem({
	beforeOnClick = () => {},
	id,
	name,
	price,
	className = undefined,
	description = "",
	just_first_image = false,
}) {
	//id stands for product id
	var nav = useNavigate();
	var [jsx_parsed_description, set_jsx_parsed_description] = useState();
	var [the_image_src, set_the_image_src] = useState(null);
	var [image_is_loading, set_image_is_loading] = useState(true);
	useEffect(() => {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then((data) => {
			var product = data.result.find((product) => product.id === Number(id));
			if (JSON.parse(product.image_file_ids).length !== 0) {
				console.log();
				custom_axios({
					data: {
						task_name: "get_low_quality_product_image",
						image_file_id: JSON.parse(product.image_file_ids)[0],
					},
					responseType: "blob",
				})
					.then((response) => {
						var tmp = URL.createObjectURL(response.data);
						set_the_image_src(tmp);
					})
					.then(() => {
						custom_axios({
							url: `/files/${JSON.parse(product.image_file_ids)[0]}`,
							method: "get",
							responseType: "blob",
						}).then((response) => {
							set_the_image_src(URL.createObjectURL(response.data));
							set_image_is_loading(false);
						});
					});
			} else {
				set_the_image_src(null);
			}
		});
	}, []);
	useEffect(() => {
		var async_tmp = async () => {
			set_jsx_parsed_description(await custom_editorjs_to_jsx(JSON.parse(description)));
		};
		async_tmp();
	}, []);
	if (just_first_image) {
		if (the_image_src === null) {
			return "there is not any image to show";
		} else {
			return (
				<div className="relative ">
					{image_is_loading && (
						<div
							style={{ background: "rgba(0,0,100,0.2)" }}
							className=" text-white rounded p-2 text-center absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
						>
							در حال بارگذاری
						</div>
					)}
					<img className="h-full" style={{ objectFit: "contain" }} src={the_image_src} />
				</div>
			);
		}
	}
	return (
		<div
			className={
				"w-1/2 sm:w-1/4 p-1 relative flex flex-col shrink-0 cursor-pointer border  border-stone-400 hover:scale-105 hover:z-10 duration-150" +
				(className ? " " + className : "")
			}
			style={{ height: "50vh" }}
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
					<div className="relative h-full rounded-lg bg-blue-400 w-full flex justify-center items-center">
						{image_is_loading && (
							<div
								style={{ background: "rgba(0,0,100,0.2)" }}
								className=" text-white rounded p-2 text-center absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
							>
								در حال بارگذاری
							</div>
						)}
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
						{jsx_parsed_description || "در حال بارگذاری اطلاعات ..."}
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
