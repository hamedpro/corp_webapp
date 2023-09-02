import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Section } from "./Section";
import React from "react";
import { OrdersPageOrder } from "./OrdersPageOrder";
import { multi_lang_helper as ml } from "../common";
import { CheckUserPrivilege } from "./CheckUserPrivilege";
import { Loading } from "./Loading";
import { Alert } from "./Alert";
import { InfoRounded } from "@mui/icons-material";
export function Orders() {
	var nav = useNavigate();
	var username = useParams().username;
	var [orders, set_orders] = useState(null);
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
		<CheckUserPrivilege
			level="specific_user_or_admin"
			specific_username={username}
		>
			<Section
				title={ml({ en: "my orders list", fa: "لیست سفارش های من" })}
				className="mx-1 mt-1"
				innerClassName="px-2"
			>
				<Loading is_loading={orders === null} />
				{orders !== null && orders.length === 0 && (
					<Alert icon={<InfoRounded />}>there is not any order for this user</Alert>
				)}
				{orders !== null &&
					orders.map((order, index) => {
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
