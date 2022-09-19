import { InfoRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { Alert } from "../alert/comp";
import { CustomTable } from "../custom_table/comp";
import { Loading } from "../loading/comp";

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
	return (
		<>
			<div className="flex flex-col">
				orders
				<Loading is_loading={orders === null} />
				{orders !== null && orders.length===0 && (
					<Alert icon={<InfoRounded />}>
						there is not any orders submitted yet
					</Alert>
				)}
				{orders !== null && orders.length !== 0 && (
					<CustomTable
					headerItems={[
						ml({en:"id",fa:""}),
						ml({en:"username",fa:""}),
						ml({en:"product_ids",fa:""}),
						ml({en:"status",fa:""}),
						ml({en:"time",fa:""}),
						ml({en:"name",fa:""}),
					]}
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
				)}
				
			</div>
		</>
	);
}
