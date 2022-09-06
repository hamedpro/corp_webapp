import { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { CustomTable } from "../custom_table/comp";

export function OrdersSection() {
	var [orders, set_orders] = useState([]);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_orders",
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
	return (
		<>
			<div className="flex flex-col">
				orders
				<CustomTable
					headerItems={["id", "username", "product_ids", "status", "time", "name"]}
					rows={orders.map((order, index) => {
						return [
							{ value: order.id, onClick: () => {} },
							{ value: order.username, onClick: () => {} },
							{ value: order.product_ids, onClick: () => {} },
							{ value: order.status, onClick: () => {} },
							{ value: order.time, onClick: () => {} },
							{ value: order.name, onClick: () => {} },
						];
					})}
				/>
			</div>
		</>
	);
}
