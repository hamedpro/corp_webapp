import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_collection } from "../../../api/client";
import { SupportMessageRow } from "../ContactUs";
import Section from "../section/comp";
export const SupportMessagesSection = () => {
	var [support_messages, set_support_messages] = useState(null);
	async function get_data() {
		set_support_messages(
			(
				await get_collection({
					collection_name: "support_messages",
					filters: {},
				})
			).data
		);
	}
	useEffect(() => {
		get_data();
	}, []);
	var nav = useNavigate();
	if (support_messages === null) return <h1>loading ... </h1>;
	return (
		<Section title="درخواست های پشتیبانی" innerClassName="px-2" className="w-full mt-2">
			{support_messages.map((sm, i) => {
				return (
					<Fragment key={i}>
						<SupportMessageRow support_message={sm} />
					</Fragment>
				);
			})}
		</Section>
	);
};
