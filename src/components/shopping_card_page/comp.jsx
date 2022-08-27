import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAjax } from "../../custom_ajax";
import Section from "../section/comp";
import { InfoRounded } from "@mui/icons-material";
import { ShoppingCardItem } from "./shopping_card_item";
import { Alert } from "../alert/comp";
import { multi_lang_helper as ml } from "../../common";
export default function ShoppingCardPage() {
	var nav = useNavigate();
	var username = useParams().username;
	var [shopping_card_items, set_shopping_card_items] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_shopping_card_items",
				username,
			},
		}).then(
			(data) => {
				customAjax({
					params: {
						task_name: "get_products",
					},
				}).then(
					(get_products_data) => {
						var oz = data.result.map((shopping_card_item) => {
							var tmp = shopping_card_item;
							tmp.product = get_products_data.result.find(
								(i) => i.id == shopping_card_item.product_id
							);
							return tmp;
						});
						if (oz.length !== 0) {
							set_shopping_card_items(oz);
						} else {
							set_shopping_card_items(null);
						}
					},
					(error) => {
						console.log(error);
					}
				);
			},
			(error) => {
				console.log(error);
				//handle errors here
			}
		);
	}
	useEffect(fetch_data, []);
	function submit_new_order() {
		customAjax({
			params: {
				task_name: "submit_a_new_order",
				name: window.prompt(
					ml({
						en: "enter a name for your new order",
						fa: "برای سفارس جدید خود یک نام وارد کنید",
					})
				),
				username,
			},
		}).then(
			(data) => {
				nav("/orders/" + data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	return (
		<div className="flex flex-col">
			<Section title={ml({ en: "my shopping card", fa: "سبد خرید من" })} className="mb-2">
				{shopping_card_items === null ? (
					<h1 className="mx-2">
						<Alert icon={<InfoRounded />}>
							{ml({
								en: "you have'nt added any product to your shopping card yet",
								fa: "شما هنوز هیچ کالایی به سبد خرید خود اضافه نکرده اید",
							})}
						</Alert>
					</h1>
				) : (
					<>
						{shopping_card_items.map((shopping_card_item, index) => {
							return (
								<React.Fragment key={index}>
									<ShoppingCardItem
										shopping_card_item={shopping_card_item}
										update_shopping_card_items_func={() => {
											fetch_data();
										}}
									/>
								</React.Fragment>
							);
						})}
					</>
				)}
			</Section>
			<button
				className="h-8 mx-1 text-white bg-blue-500 rounded hover:bg-blue-600 duration-300"
				onClick={submit_new_order}
			>
				{ml({
					en: "submit them as an order",
					fa: "ثبت به عنوان یک سفارش جدید",
				})}
			</button>
		</div>
	);
}
