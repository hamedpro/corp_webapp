import React from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../custom_ajax";
import { trim_text_if_its_long } from "../../common";
import { DeleteRounded } from "@mui/icons-material";
import { multi_lang_helper as ml } from "../../common";
export function ShoppingCardItem({ shopping_card_item, update_shopping_card_items_func }) {
	var nav = useNavigate();
	function update_shopping_card_item_count(new_count) {
		customAjax({
			params: {
				task_name: "update_shopping_card_item",
				product_id: Number(shopping_card_item.product.id),
				new_count,
				username: window.localStorage.getItem("username"),
			},
		}).then(
			(data) => {
				update_shopping_card_items_func();
			},
			(error) => {
				console.log(error);
				//todo handle error here
				//todo check all code once
			}
		);
	}
	var custom_button_className =
		"h-6 w-6 border border-blue-600 text-white p-1 flex justify-center items-center rounded-lg ";
	return (
		<div className="mx-2 bg-blue-500 text-white mb-2">
			<div className="flex">
				<div className="w-1/2">
					{shopping_card_item.product.images_path_names.length !== 0 ? (
						<img
							src={`http://${window.location.hostname}:4000/product_images/${shopping_card_item.product.images_path_names[0]}`}
							className="w-full"
						/>
					) : (
						<>
							<div className="w-full h-full bg-blue-400 text-whtie">
								{ml({
									en: "this product has'nt any image",
									fa: "",
								})}
							</div>
						</>
					)}
				</div>
				<div className="w-1/2 p-2">
					<h1
						className="cursor-pointer"
						onClick={() => nav("/products/" + shopping_card_item.product.id)}
					>
						#{shopping_card_item.product.id} : {shopping_card_item.product.name}
					</h1>
					<h1 className="text-sm">
						{trim_text_if_its_long(shopping_card_item.product.description, 25)}
					</h1>
					<div className="flex mt-2">
						<button
							className={custom_button_className}
							onClick={() =>
								update_shopping_card_item_count(
									Number(shopping_card_item.count) - 1
								)
							}
						>
							-
						</button>
						<div className="mx-1">{shopping_card_item.count}</div>
						<button
							className={custom_button_className}
							onClick={() =>
								update_shopping_card_item_count(
									Number(shopping_card_item.count) + 1
								)
							}
						>
							+
						</button>
						<h1 className="mx-2">|</h1>
						<button
							className={custom_button_className}
							onClick={() => update_shopping_card_item_count(0)}
						>
							<DeleteRounded sx={{ color: "white" }} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
