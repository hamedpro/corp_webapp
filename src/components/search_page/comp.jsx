import { ArrowBackIosNewRounded } from "@mui/icons-material";
import React, { useState } from "react";
import Section from "../section/comp";
import { customAjax } from "../../custom_ajax";
import ListItem from "../list_item/comp";
import { useNavigate } from "react-router-dom";
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
						console.log(JSON.stringify(product));
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
				<h1 className="ml-2 text-xl text-white">search center</h1>
			</div>
			<div className="flex mx-3 my-2 h-10">
				<input
					type="text"
					id="search_input"
					className="border border-stone-400 rounded-lg px-2 w-full"
					placeholder="start typing here"
					onChange={handle_input_change}
				/>
			</div>
			<Section title="results" className="mx-2">
				{search_results === null ? (
					<h1 className="text-white mx-2 mt-1">results will be shown here</h1>
				) : (
					<>
						{search_results.map((result, index) => {
							var items = [];
							if (result.images_path_names.length == 0) {
								items.push("no image");
							}
							items = items.concat([result.name, result.price + " toman"]);
							return (
								<React.Fragment key={index}>
									<ListItem
										items={items}
										onClick={() => {
											nav("products/" + result.id);
											props.hide_func();
										}}
										image_src={
											result.images_path_names.length !== 0
												? "http://" +
												  location.hostname +
												  ":4000/product_images/" +
												  result.images_path_names[0]
												: null
										}
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
