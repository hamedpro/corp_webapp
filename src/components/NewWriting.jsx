import React from "react";
import { customAjax } from "../custom_ajax";
import Section from "./section/comp";
import { StyledDiv, StyledInput } from "./styled_elements";

export const NewWriting = () => {
	async function submit_new_writing() {
		var el_files = document.getElementById("image_input").files;
		if (el_files.length === 0) {
			alert("please select a photo");
			return;
		}
		var form = new FormData();
		form.append("file", el_files[0]);
		var server_response = await fetch(window.api_endpoint, {
			method: "POST",
			body: form,
			headers: {
				task_name: "upload",
			},
		});
		var { new_filename } = await server_response.json();
		customAjax({
			params: {
				task_name: "new_writing",
				title: document.getElementById("title_input").value,
				text: document.getElementById("text_input").value,
				image_filename: new_filename,
				publish_date: new Date().getTime(),
				publisher_username: localStorage.getItem("username"),
			},
		}).then(
			(data) => alert("all done"),
			(error) => console.log(error)
		);
	}
	return (
		<Section title="ثبت نوشته جدید" className="m-1" innerClassName="p-2">
			<h1>انتخاب تصویر برای نوشته جدید:</h1>
			<input id="image_input" type="file" />

			<h1>یک عنوان برای این نوشته وارد کنید:</h1>
			<StyledInput id="title_input" />
			<h1>متن این نوشته را اینجا وارد کنید :</h1>
			<StyledInput textarea_mode={true} id="text_input" className="w-1/2 " />
			<StyledDiv onClick={submit_new_writing} className="w-fit">
				انتشار این نوشته{" "}
			</StyledDiv>
		</Section>
	);
};
