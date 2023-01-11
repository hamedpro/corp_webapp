import React from "react";
import { customAjax } from "../custom_ajax";

export const NewWriting = () => {
	async function submit_new_writing() {
		var el_files = document.getElementById("image_input").files;
		if (el_files.length === 0) {
			alert("please select a photo ");
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
		<div>
			<h1>new writing page </h1>
			<input id="image_input" type="file" />

			<h1>enter a title for this writing</h1>
			<input id="title_input" />

			<h1>enter a text for this writing</h1>
			<input id="text_input" />
			<button onClick={submit_new_writing}>send this </button>
		</div>
	);
};
