import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { multi_lang_helper as ml } from "../../common";
import { customAjax } from "../../custom_ajax";

export default function AddToShoppingBagBar(props) {
	var username = window.localStorage.getItem("username");
	var product_id = useParams().product_id;
	var [this_product_shopping_count, set_this_product_shopping_count] = useState(null);
	var button_class_name =
		"h-8 w-8 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-800 rounded";
	function load_data_from_server() {
		customAjax({
			params: {
				task_name: "get_shopping_card_items",
				username: window.localStorage.getItem("username"),
			},
		}).then(
			(data) => {
				if (
					data.result.filter((item) => item.product_id == Number(product_id)).length !== 0
				) {
					set_this_product_shopping_count(
						data.result.filter((item) => item.product_id == Number(product_id))[0].count
					);
				} else {
					set_this_product_shopping_count(0);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
	function update_shopping_card_item_and_fetch_data(new_count) {
		customAjax({
			params: {
				task_name: "update_shopping_card_item",
				product_id: Number(product_id),
				new_count,
				username,
			},
		}).then(
			(data) => {
				load_data_from_server();
			},
			(error) => {
				console.log(error);
				//todo handle error here
				//todo check all code once
			}
		);
	}
	function handle_first_add_to_shopping_card() {
		if (username === null) {
			alert(
				ml({
					en: "you have to login first.",
					fa: "شما باید ابتدا وارد حساب کاربری خود شوید",
				})
			);
		} else {
			update_shopping_card_item_and_fetch_data(1);
		}
	}
	useEffect(() => {
		load_data_from_server();
	}, []);

	return (
		<div className="mt-3 realative bottom-0 w-full py-2 bg-blue-400 flex items-center px-2 z-30">
			<div className="w-2/5 flex flex-col text-sm">
				<p className="block">
					{ml({
						en: "price:",
						fa: "قیمت :‌",
					})}
				</p>
				<b className="block">
					{props.price + " "}{" "}
					<span className="inline">{ml({ en: "toman", fa: "تومن" })}</span>
				</b>
			</div>
			<div className="w-3/5">
				{this_product_shopping_count === null ? (
					<h1>{ml({ en: "loading ...", fa: "در حال بارگذاری..." })}</h1>
				) : (
					<></>
				)}
				{this_product_shopping_count === 0 ? (
					<button
						className="w-full bg-white text-sky-900 py-1 rounded-lg"
						onClick={() => handle_first_add_to_shopping_card()}
					>
						{ml({
							en: "add to shopping bag",
							fa: "اضافه کردن به سبد خرید",
						})}
					</button>
				) : (
					<></>
				)}
				{this_product_shopping_count !== 0 && this_product_shopping_count !== null ? (
					<div className="flex w-full px-4 space-x-2 justify-end">
						<button
							className={button_class_name}
							onClick={() =>
								update_shopping_card_item_and_fetch_data(
									this_product_shopping_count - 1
								)
							}
						>
							-
						</button>
						<div className="h-8 w-8 flex items-center justify-center">
							{this_product_shopping_count}
						</div>
						<button
							className={button_class_name}
							onClick={() =>
								update_shopping_card_item_and_fetch_data(
									this_product_shopping_count + 1
								)
							}
						>
							+
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
