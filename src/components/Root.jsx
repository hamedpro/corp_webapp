import { Link, useNavigate } from "react-router-dom";
import { ProductsRow } from "./ProductsRow";
import { Business, Download, Phone, Settings, Stars } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { customAjax } from "../custom_ajax";
import { gen_link_to_file, shuffle } from "../common";
import { custom_axios } from "../../api/client";
import { ContentSlider } from "./ContentSlider";
import { RootWritingsSection } from "./RootWritingsSection";
export function CustomBlock({ title, info, button_text, button_onclick, Icon }) {
	return (
		<div className="bg-gray-100 flex p-4 items-center h-full my-1 justify-center sm:justify-start flex-col sm:flex-row">
			<div
				className="w-1/4 rounded-lg flex justify-center items-center"
				style={{ aspectRatio: 1 }}
			>
				<Icon sx={{ width: "90%", height: "90%", color: "rgb(55,65,81)" }} />
			</div>
			<div className="h-full text-gray-700 w-3/4 p-2 text-center">
				<div>
					<h1 className="text-4xl mb-2">{title}</h1>
					<p className="mb-6 text-lg">{info}</p>
				</div>
				<button className="border rounded px-2 my-2 text-2xl" onClick={button_onclick}>
					{button_text}
				</button>
			</div>
		</div>
	);
}
export function Root() {
	var [products, set_products] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_products",
			},
		}).then(
			(data) => {
				set_products(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	var suggested_products = () => (products === null ? null : shuffle(products).slice(0, 7));
	var nav = useNavigate();
	useEffect(fetch_data, []);
	var [writings, set_writings] = useState(null);
	useEffect(() => {
		custom_axios({
			baseURL: vite_api_endpoint,
			url: "api-v2",
			headers: { task: "get_collection" },
			data: {
				collection_name: "writings",
				filters: {},
			},
		}).then((data) => set_writings(data.data), console.log);
	}, []);
	if (writings === null) return "loading ...";
	return (
		<>
			<ContentSlider />
			<br />
			{/* <ProductsRow
				icon={<Stars sx={{ color: "gray" }} />}
				title="محصولات ما"
				products={suggested_products()}
			/> */}
		</>
	);
}
