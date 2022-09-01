import { ArrowBackIosNewRounded } from "@mui/icons-material";
import React, { useState } from "react";
import Section from "../section/comp";
import { customAjax } from "../../custom_ajax";
import { useNavigate } from "react-router-dom";
import ProductListItem from "../product_list_item/comp";
import { multi_lang_helper as ml } from "../../common";
export default function SearchModal(props) {
	var nav = useNavigate();
	var [search_results, set_search_results] = useState(null);
	if (props.visibility !== true) {
		return null;
	}
	function handle_input_change() {
		var key = document.getElementById("search_input").value;
		if (key == "") {
			set_search_results([]);
			return;
		}
		customAjax({
			// todo switch to axois or ... instead of custom ajax
			params: {
				task_name: "get_products",
			},
		}).then(
			(data) => {
				//todo improve search algo
				//filter results here and assign related products to results
				var products = data.result;
				set_search_results(
					products.filter((product) => {
						return JSON.stringify(product).includes(key);
					})
				);
			},
			(error) => {
				//todo handle errors here
			}
		);
	}
	return (
		<div className="h-full w-full fixed bg-blue-800 top-0 left-0 z-50 flex flex-col">
			<div className="flex m-1 mt-2 items-center" onClick={props.hide_func}>
				<ArrowBackIosNewRounded
					sx={{ color: "white" }}
					className="hover:bg-blue-600 px-1 duration-400 rounded-lg"
				/>
				<h1 className="ml-2 text-xl text-white">
					{ml({
						en: "search center",
						fa: "بخش جستجو",
					})}
				</h1>
			</div>
			<div className="flex mx-3 my-2 h-10">
				<input
					type="text"
					id="search_input"
					className="border border-stone-400 rounded-lg px-2 w-full"
					placeholder={ml({ en: "start typing here", fa: "شروع به تایپ کنید" })}
					onChange={handle_input_change}
				/>
			</div>
			<Section title={ml({ en: "results", fa: "" })} className="mx-2">
				{search_results === null ? (
					<h1 className="text-white mx-2 mt-1">
						{ml({
							en: "results will be shown here",
							fa: "نتایج اینجا نمایش داده خواهند شد",
						})}
					</h1>
				) : (
					<>
						{search_results.map((result, index) => {
							var items = [];
							if (result.images_path_names.length == 0) {
								items.push(ml({ en: "no image", fa: "بدون عکس" }));
							}
							items = items.concat([
								result.name,
								result.price + ml({ en: " toman", fa: "تومن" }),
							]);
							return (
								<React.Fragment key={index}>
									<ProductListItem
										items={items}
										onClick={() => {
											nav("products/" + result.id);
											props.hide_func();
										}}
										images_path_names={result.images_path_names}
									/>
								</React.Fragment>
							);
						})}
					</>
				)}
			</Section>
		</div>
	);
}
