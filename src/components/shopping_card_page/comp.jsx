import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAjax } from "../../custom_ajax";
import ListItem from "../list_item/comp";
import ProductListItem from "../product_list_item/comp";
import Section from "../section/comp";
import { trim_text_if_its_long } from "../../common";
import { DeleteRounded } from "@mui/icons-material";
import { ShoppingCardItem } from "./shopping_card_item";
export default function ShoppingCardPage() {
	var nav = useNavigate();
	var username = useParams().username;
	var [shopping_card_items, set_shopping_card_items] = useState([]);
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
						set_shopping_card_items(
							data.result.map((shopping_card_item) => {
								var tmp = shopping_card_item;
								tmp.product = get_products_data.result.find(
									(i) => i.id == shopping_card_item.product_id
								);
								return tmp;
							})
						);
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
				name: window.prompt("enter a name for your new order"),
				username,
			},
			verbose: true,
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
			<Section title="my shopping card">
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
			</Section>
			<button className="w-full h-8 mx-2 text-white bg-blue-500" onClick={submit_new_order}>
				submit them as an order
			</button>
		</div>
	);
}
