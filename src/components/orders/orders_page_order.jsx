import { useNavigate } from "react-router-dom";
import ListItem from "../list_item/comp";
import React from "react";
import { multi_lang_helper as ml } from "../../common";
export function OrdersPageOrder({ order }) {
	var nav = useNavigate();
	//order's structure : name, status, time , order_id , username
	//it's now same as columns of a order row in db
	return (
		<ListItem
			items={[
				ml({ en: "order_name: ", fa: "نام سفارش:" }) + order.name,
				ml({ en: "status: ", fa: "وضعیت سفارش:" }) + order.status,
				ml({ en: "submited in: ", fa: "ثبت شده در : " }) + order.time,
			]}
			onClick={() => {
				nav(`/users/${order.username}/orders/${order.id}`);
			}}
			vertical={true}
		/>
	);
}
