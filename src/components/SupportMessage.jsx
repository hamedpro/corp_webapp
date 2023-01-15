import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_collection } from "../../api/client";
import { CheckUserPrivilege } from "./CheckUserPrivilege/comp";
import Section from "./section/comp";
import { SupportMessageInfo } from "./SupportMessageInfo";
import { SupportMessageManagement } from "./SupportMessageManagement";

export const SupportMessage = ({}) => {
	var { support_message_id } = useParams();
	var [support_message, set_support_message] = useState(null);
	async function get_data() {
		var tmp = await get_collection({
			collection_name: "support_messages",
			filters: {
				_id: support_message_id,
			},
		});
		set_support_message(tmp[0]);
	}
	useEffect(() => {
		get_data();
	}, []);
	if (support_message === null) return <h1>loading ... </h1>;
	return (
		<div className="m-2">
			<SupportMessageInfo support_message={support_message} />
			<CheckUserPrivilege level="admin">
				<SupportMessageManagement support_message={support_message} get_data={get_data} />
			</CheckUserPrivilege>
		</div>
	);
};
