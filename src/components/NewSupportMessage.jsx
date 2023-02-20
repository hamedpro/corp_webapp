import React from "react";
import { new_document } from "../../api/client";
import { Section } from "./Section";
import { StyledDiv, StyledInput } from "./StyledElements";

export const NewSupportMessage = () => {
	async function submit_support_message() {
		await new_document({
			collection_name: "support_messages",
			document: {
				username: localStorage.getItem("username"),
				title: document.getElementById("title_input").value,
				text: document.getElementById("text_input").value,
				date: new Date().getTime(),
			},
		});
		alert("با موفقیت انجام شد");
	}
	return (
		<div>
			<Section title="ثبت درخواست پشتیبانی جدید" innerClassName="p-2" className="m-2">
				<h1>عنوان این درخواست پشتیانی را وارد کنید</h1>
				<StyledInput id="title_input" />
				<h1>متن این درخواست پشتیانی را وارد کنید</h1>
				<StyledInput id="text_input" textarea_mode={true} />
				<br />
				<StyledDiv className="w-fit" onClick={submit_support_message}>
					ثبت این درخواست پشتیانی{" "}
				</StyledDiv>
			</Section>
		</div>
	);
};
