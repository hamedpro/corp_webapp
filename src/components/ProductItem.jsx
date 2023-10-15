import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoPhotographyRoundedIcon from "@mui/icons-material/NoPhotographyRounded";
import { InfoRounded, SellRounded } from "@mui/icons-material";
import { custom_editorjs_to_jsx } from "../jsx_helpers";
import { context } from "freeflow-react";
import { calc_file_url } from "freeflow-core/dist/utils";
export function ProductItem({ product, className = undefined, just_first_image = false }) {
	var nav = useNavigate();
	var { profiles_seed, rest_endpoint } = useContext(context);
	var the_image_src = calc_file_url(
		profiles_seed,
		rest_endpoint,
		product.thing.value.image_file_ids[0]
	);
	var [jsx_parsed_description, set_jsx_parsed_description] = useState(<></>);
	useEffect(() => {
		custom_editorjs_to_jsx(JSON.parse(product.thing.value.description)).then((data) => {
			set_jsx_parsed_description(data);
		});
	}, [product.thing.value.description]);
	if (just_first_image) {
		if (the_image_src === undefined) {
			return "there is not any image to show";
		} else {
			return (
				<div className="relative ">
					<img
						className="h-full"
						style={{ objectFit: "contain" }}
						src={the_image_src}
					/>
				</div>
			);
		}
	}
	return (
		<div
			className={
				"w-1/2 sm:w-1/4 p-1 relative flex flex-col shrink-0 cursor-pointer border  border-stone-400 hover:scale-105 hover:z-10 duration-150 text-black" +
				(className ? " " + className : "")
			}
			style={{ height: "50vh" }}
			onClick={() => nav("/products/" + product.thing_id)}
		>
			<div className="relative w-full h-1/2 mx-auto flex items-center justify-center">
				{the_image_src === undefined ? (
					<div className="h-full rounded-lg bg-blue-400 w-full flex justify-center items-center">
						<NoPhotographyRoundedIcon className="text-white" />
					</div>
				) : (
					<div className="relative h-full rounded-lg bg-blue-400 w-full flex justify-center items-center">
						<img
							className="h-full"
							style={{ objectFit: "contain" }}
							src={the_image_src}
							alt={"اولین عکس این محصول"}
						/>
					</div>
				)}
			</div>
			<div className=" mt-1">
				<h1 className="text-3xl">{product.thing.value.name}</h1>
				<div className="flex space-x-1 mt-3">
					<InfoRounded
						sx={{ color: "darkblue" }}
						className="pt-1"
					/>{" "}
					<span className="text-lg break-all">
						{jsx_parsed_description || "در حال بارگذاری اطلاعات ..."}
					</span>
				</div>
			</div>
			<div className=" mt-1">
				<div className="flex space-x-1 mt-3">
					<SellRounded
						sx={{ color: "darkblue" }}
						className="pt-1"
					/>{" "}
					<span className="text-lg break-all">{product.thing.value.price} تومن</span>
				</div>
			</div>
		</div>
	);
}
