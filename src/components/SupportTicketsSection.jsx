import { InfoRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { CustomTable } from "./CustomTable";
import { Loading } from "./Loading";

export function SupportTicketsSection() {
	var [support_tickets, set_support_tickets] = useState(null);
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
			ml({
				en: "none of these fields are changeable from here \n open this support ticket page and modify it there",
				fa: "",
			})
		);
	}
	return (
		<div className="flex flex-col">
			{ml({
				en: "support tickets ",
				fa: "",
			})}
			{/* todo add filter option */}
			<Loading is_loading={support_tickets === null} />
			{support_tickets !== null && support_tickets.length === 0 && (
				<Alert icon={<InfoRounded />}>there is not any support ticket submitted</Alert>
			)}
			{support_tickets !== null && support_tickets.length !== 0 && (
				<CustomTable
					headerItems={[
						ml({ en: "id", fa: "" }),
						ml({ en: "username", fa: "" }),
						ml({ en: "title", fa: "" }),
						ml({ en: "type", fa: "" }),
						ml({ en: "text", fa: "" }),
						ml({ en: "is_proceed", fa: "" }),
						ml({ en: "proceeded_by", fa: "" }),
						ml({ en: "open it", fa: "" }),
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
			)}
		</div>
	);
}
