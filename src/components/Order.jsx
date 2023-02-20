import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customAjax } from "../custom_ajax";
import {ListItem} from "./ListItem";
import {Section} from "./Section";
import { multi_lang_helper as ml } from "../common";
import { CheckUserPrivilege } from "./CheckUserPrivilege";
import { Loading } from "./Loading";
export function Order() {
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
		<CheckUserPrivilege level="specific_user_or_admin" specific_username={username}>
			<Loading is_loading={order === null} />
			{order !== null && (
				<Section title={ml({ en: "order details", fa: "جزییات سفارش ها" })}>
					<ListItem
						vertical={true}
						remove_arrow={true}
						items={Object.keys(order).map((key) => key + ": " + order[key])}
					/>
				</Section>
			)}
		</CheckUserPrivilege>
	);
}
