import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../custom_ajax";
import { CustomTable } from "../custom_table/comp";

export function SupportTicketsSection() {
	var [support_tickets, set_support_tickets] = useState([]);
	var nav = useNavigate();
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
	function custom_warning() {
		alert(
			"none of these fields are changeable from here \n open this support ticket page and modify it there"
		);
	}
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
					"open it",
				]}
				rows={support_tickets.map((st, index) => {
					return [
						{ value: st.id, onClick: custom_warning },
						{ value: st.username, onClick: custom_warning },
						{ value: st.title, onClick: custom_warning },
						{ value: st.type, onClick: custom_warning },
						{ value: st.text, onClick: custom_warning },
						{ value: st.is_proceed, onClick: custom_warning },
						{ value: st.proceeded_by, onClick: custom_warning },
						{
							value: "open it",
							onClick: () => {
								nav(`/support-tickets/${st.id}`);
							},
						},
					];
				})}
			/>
		</div>
	);
}
