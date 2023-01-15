import { React } from "react";
import Section from "./section/comp";
import { update_document } from "../../api/client";
import { StyledDiv, StyledInput } from "../components/styled_elements";
export const SupportMessageManagement = ({ support_message, get_data }) => {
	async function submit_response() {
		await update_document({
			collection: "support_messages",
			update_filter: {
				_id: support_message._id,
			},
			update_set: {
				response: document.getElementById("response_input").value,
				responder: localStorage.getItem("username"),
			},
		});
		get_data();
		alert("all done");
	}
	return (
		<Section title="مدیریت این درخواست پشتیبانی" className="p-2" innerClassName="p-2">
			{support_message.response
				? `متن پاسخ ارسال شده برای این درخواست پشتیبانی : ${support_message.response}`
				: `هنوز برای این درخواست پشتیبانی پاسخی ثبت نشده است`}
			<h1>متن پاسخ خود را در این بخش تایپ کنید</h1>
			<StyledInput id="response_input" textarea_mode={true} />
			<StyledDiv className="w-fit" onClick={submit_response}>
				ارسال پاسخ
			</StyledDiv>
		</Section>
	);
};
