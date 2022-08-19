import { useNavigate } from "react-router-dom";
import ListItem from "../list_item/comp";
import React from "react";
export function OrdersPageOrder({ order }) {
	var nav = useNavigate();
	//order's structure : name, status, time , order_id , username
	//it's now same as columns of a order row in db
	return (
		<ListItem
			items={[
				"order_name: " + order.name,
				"status: " + order.status,
				"submited in: " + order.time,
			]}
			onClick={() => {
				nav(`/users/${order.username}/orders/${order.id}`);
			}}
			vertical={true}
		/>
	);
}
