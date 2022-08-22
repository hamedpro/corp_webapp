import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../../custom_ajax";
import ListItem from "../list_item/comp";
import Section from "../section/comp";
export default function Order() {
	var username = useParams().username;
	var order_id = Number(useParams().order_id);
	var [order, set_order] = useState(null);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_user_orders",
				username,
			},
		}).then(
			(data) => {
				set_order(data.result.find((i) => i.id == order_id));
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	//todo : use user_id instead of username in whole app becuse username can be changed
	return (
		<>
			{order === null ? (
				<h1>loading</h1>
			) : (
				<Section title="order details">
					<ListItem
						vertical={true}
						remove_arrow={true}
						items={Object.keys(order).map((key) => key + ": " + order[key])}
					/>
				</Section>
			)}
		</>
	);
}