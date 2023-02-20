import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAjax } from "../custom_ajax";
import { Section } from "./Section";
import { InfoRounded } from "@mui/icons-material";
import { ShoppingCardItem } from "./ShoppingCardItem";
import { Alert } from "./Alert";
import { multi_lang_helper as ml } from "../common";
import { CheckUserPrivilege } from "./CheckUserPrivilege";
import { Loading } from "./Loading";
export function ShoppingCardPage() {
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
						set_shopping_card_items(oz);
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
				name: document.getElementById("order_name_input").value,
				username,
			},
		}).then(
			(data) => {
				nav(`/users/${username}/orders/` + data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	return (
		<CheckUserPrivilege level="specific_user_or_admin" specific_username={username}>
			<div className="flex flex-col">
				<Section
					title={ml({ en: "my shopping card", fa: "سبد خرید من" })}
					className="mb-2 mx-1 mt-2"
				>
					<Loading is_loading={shopping_card_items === null} />
					{shopping_card_items !== null && shopping_card_items.length === 0 && (
						<h1 className="mx-2">
							<Alert icon={<InfoRounded />}>
								{ml({
									en: "you have'nt added any product to your shopping card yet",
									fa: "شما هنوز هیچ کالایی به سبد خرید خود اضافه نکرده اید",
								})}
							</Alert>
						</h1>
					)}

					{shopping_card_items !== null &&
						shopping_card_items.map((shopping_card_item, index) => {
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
				</Section>
				<Section
					title={ml({
						en: "submit a new order",
						fa: "ثبت سفارش جدید",
					})}
					className="mx-1 mt-1"
					innerClassName="flex justify-center items-center"
				>
					<div className="flex flex-col m-1 w-1/2 px-1 text-center justify-center items-center text-lg">
						<p>
							{ml({
								en: "if you want to submit a order including these products above please enter a simple name for this order and click submit",
								fa: "اگر میخواهید سفارش جدیدی شامل کالا های اضافه شده به سبد خرید خود ثبت  کنید لطفا برای سفارش جدید خود به دلخواه اسمی وارد کنید و بر روی ثبت سفارش کلیک کنید",
							})}
						</p>
						<input
							className="w-3/4 border border-blue-400 rounded mb-1 mt-3 px-1"
							placeholder={ml({
								en: "name of your new order",
								fa: "نام سفارش جدید شما",
							})}
							id="order_name_input"
						/>

						<button
							className="w-3/4 h-8 text-white bg-blue-500 px-1 rounded hover:bg-blue-600 duration-300 mt-1"
							onClick={submit_new_order}
						>
							{ml({
								en: "submit them as an order",
								fa: "ثبت به عنوان یک سفارش جدید",
							})}
						</button>
					</div>
				</Section>
			</div>
		</CheckUserPrivilege>
	);
}
