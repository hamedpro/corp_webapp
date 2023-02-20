import { InfoRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { customAjax } from "../custom_ajax";
import { Alert } from "./Alert";
import { CustomTable } from "./CustomTable";
import { Loading } from "./Loading";

export function OrdersSection() {
	var [orders, set_orders] = useState(null);
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
	function update_order({ row_id, col_name, new_val = undefined }) {
		if (new_val === undefined) new_val = prompt("enter new value:");
		if (new_val === null) {
			alert("operation was canceled by user");
			return;
		}
		customAjax({
			params: {
				task_name: "update_cell",
				col_name,
				new_val,
				new_val_type: "string",
				table_name: "orders",
				row_id,
				// todo may newly added column in future not be strings
				//(it now works even for id despite type is set to string but im not totally sure)
			},
		})
			.then(
				() => alert("done"),
				(e) => {
					alert("something went wrong");
					console.log(e);
				}
			)
			.finally(fetch_data);
	}
	return (
		<>
			<div className="flex flex-col">
				orders
				<Loading is_loading={orders === null} />
				{orders !== null && orders.length === 0 && (
					<Alert icon={<InfoRounded />}>there is not any orders submitted yet</Alert>
				)}
				{orders !== null && orders.length !== 0 && (
					<CustomTable
						headerItems={[
							ml({ en: "id", fa: "" }),
							ml({ en: "username", fa: "" }),
							ml({ en: "product_ids", fa: "" }),
							ml({ en: "status", fa: "" }),
							ml({ en: "time", fa: "" }),
							ml({ en: "order name", fa: "" }),
						]}
						rows={orders.map((order, index) => {
							var tmp = (col_name) => {
								update_order({
									row_id: Number(order.id),
									col_name,
								});
							};
							return [
								{
									value: order.id,
									onClick: () => tmp("id"),
								},
								{ value: order.username, onClick: () => tmp("username") },
								{ value: order.product_ids, onClick: () => tmp("product_ids") },
								{
									value: order.status,
									onClick: () => {
										alert(
											`this field can not be changed manually from here \nyou should follow order delivery progress instead`
										);
									},
								},
								{ value: order.time },
								{ value: order.name, onClick: () => tmp("name") },
							];
						})}
					/>
				)}
			</div>
		</>
	);
}
