import { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { CustomTable } from "../custom_table/comp";

export function SupportTicketsSection() {
	var [support_tickets, set_support_tickets] = useState([]);
	function fetch_data() {
		customAjax({
			params: {
				task_name: "get_support_tickets",
			},
		}).then(
			(data) => {
				set_support_tickets(data.result);
			},
			(error) => {
				console.log(error);
			}
		);
	}
	useEffect(fetch_data, []);
	return (
		<div className="flex flex-col">
			support tickets {/* todo add filter option */}
			<CustomTable
				headerItems={[
					"id",
					"username",
					"title",
					"type",
					"text",
					"is_proceed",
					"proceeded_by",
				]}
				rows={support_tickets.map((st, index) => {
					return [
						{ value: st.id, onClick: () => {} },
						{ value: st.username, onClick: () => {} },
						{ value: st.title, onClick: () => {} },
						{ value: st.type, onClick: () => {} },
						{ value: st.text, onClick: () => {} },
						{ value: st.is_proceed, onClick: () => {} },
						{ value: st.proceeded_by, onClick: () => {} },
					];
				})}
			/>
		</div>
	);
}
