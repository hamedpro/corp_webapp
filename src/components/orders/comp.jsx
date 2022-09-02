import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAjax } from "../../custom_ajax";
import Section from "../section/comp";
import React from "react";
import { OrdersPageOrder } from "./orders_page_order";
import { multi_lang_helper as ml } from "../../common";
import { CheckUserPrivilege } from "../CheckUserPrivilege/comp";
export default function Orders() {
	var nav = useNavigate();
	var username = useParams().username;
	var [orders, set_orders] = useState([]);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_user_orders",
				username,
			},
		}).then(
			(data) => {
				set_orders(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);

	//todo add current available count
	//todo reserve a product when adding it to shopping bag for 3 hours
	//todo add discout system
	//add system to alert user when product comes available
	return (
		<CheckUserPrivilege level="specific_user_or_admin" specific_username={username}>
			<Section title={ml({ en: "my orders list", fa: "لیست سفارش های من" })}>
				{orders.map((order, index) => {
					return (
						<React.Fragment key={index}>
							<OrdersPageOrder order={order} />
						</React.Fragment>
					);
				})}
			</Section>
		</CheckUserPrivilege>
	);
}
