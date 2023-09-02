import { React } from "react";
import { Section } from "./Section";

import { StyledDiv, StyledInput } from "./StyledElements";
import { Alert } from "./Alert";
import { useNavigate } from "react-router-dom";
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
	var nav = useNavigate();
	return (
		<>
			<Section
				title="متن پاسخ به این درخواست پشتیبانی"
				className="p-2"
				innerClassName="px-2"
			>
				{support_message.response ? (
					<>
						<p>{support_message.response}</p>
						<p
							onClick={() => nav(`/users/${support_message.responder}`)}
							className="text-stone-700 text-sm"
						>
							(پاسخگو :
							<span style={{ direction: "ltr" }}>{support_message.responder}</span>)
						</p>
					</>
				) : (
					<Alert>هنوز برای این درخواست پشتیبانی پاسخی ثبت نشده است</Alert>
				)}
			</Section>
			<Section
				title="پاسخ دادن به این درخواست پشتیبانی"
				className="p-2"
				innerClassName="px-2"
			>
				<h1>متن پاسخ خود را در این بخش تایپ کنید</h1>
				<StyledInput
					id="response_input"
					textarea_mode={true}
					className="w-1/3"
				/>
				<StyledDiv
					className="w-fit"
					onClick={submit_response}
				>
					ارسال پاسخ
				</StyledDiv>
			</Section>
		</>
	);
};
