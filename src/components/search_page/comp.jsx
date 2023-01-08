import { ArrowBackIosNewRounded } from "@mui/icons-material";
import React, { useState } from "react";
import Section from "../section/comp";
import { customAjax } from "../../custom_ajax";
import { useNavigate } from "react-router-dom";
import ProductListItem from "../product_list_item/comp";
import { multi_lang_helper as ml } from "../../common";
import ProductItem from "../products/product_item";
import { ArrowTitle } from "../ArrowTitle";
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
		<div className="h-full w-full fixed bg-sky-800 top-0 left-0 z-50 flex flex-col">
			<ArrowTitle title="search center" onClick={props.hide_func} />
			<div className="flex mx-2 my-2 h-10">
				<input
					type="text"
					id="search_input"
					className="border border-stone-400 rounded-lg px-2 w-full"
					placeholder={ml({ en: "start typing here", fa: "شروع به تایپ کنید" })}
					onChange={handle_input_change}
				/>
			</div>
			<Section title={ml({ en: "results", fa: "نتایج" })} className="mx-2 overflow-y-scroll" innerClassName="px-1">
				{search_results === null ? (
					<h1 className="text-white mx-2 mt-1">
						{ml({
							en: "results will be shown here",
							fa: "نتایج اینجا نمایش داده خواهند شد",
						})}
					</h1>
				) : (
						<>
							<div className="h-full flex justify-between mx-2 mt-4 mb-2 text-sm border-b border-stone-400 ">
					<p className="text-stone-300">
						{ml({
							en: "filtered products",
							fa: "محصولات فیلتر شده",
						})}
					</p>
					<p className="text-stone-300">
						{search_results.length}{" "}
						{ml({
							en: "product",
							fa: "محصول",
						})}
					</p>
				</div>
				<div className="flex flex-wrap justify-start mx-2">
					{search_results.map((product) => {
						return (
							<ProductItem
								id={product.id}
								name={product.name}
								price={product.price}
								key={product.id}
								className="bg-white"
								description={product.description}
							/>
						);
					})}
				</div>
						
					</>
				)}
			</Section>
		</div>
	);
}
