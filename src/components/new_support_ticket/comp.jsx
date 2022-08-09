import { useContext, useEffect } from "react";
import { customAjax } from "../../../common-codes/custom_api_system/dev/custom_ajax";

export default function NewSupportTicket() {
	function new_supprot_ticket() {
		customAjax({
			params: {
				task_name: "new_support_ticket",
				username: localStorage.getItem("username"),
				text: document.getElementById("support_ticket_text_input").value,
				type: document.getElementById("type-select-id").value,
				title: document.getElementById("title_input").value,
			},
		}).then(
			(data) => {
				if (data.result) {
					alert("done");
				} else {
					alert("result field was not true");
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
	// id username title type text is_proceed proceeded_by
	return (
		<div className="mx-auto rounded mt-2 p-2 w-full border border-blue-400">
			<h1 className="text-lg mb-2">new support ticket</h1>
			<hr />

			<p className="mt-2 inline-block">username:</p>
			<input
				className="border border-green-600 inline-block"
				placeholder={window.localStorage.getItem("username")}
				disabled
			/>

			<p className="mt-2">title:</p>
			<textarea id="title_input" className="border border-green-600"></textarea>

			<p className="mt-2">enter support ticket text:</p>
			<textarea id="support_ticket_text_input" className="border border-green-600"></textarea>

			<p className="mt-2">enter support ticket type:</p>
			<select id="type-select-id" className="border border-green-500 p-1">
				<option value="bug">bug</option>
				<option value="suggestion">suggestion</option>
				<option value="other">other</option>
			</select>

			<button
				onClick={new_supprot_ticket}
				className="block border border-green-400 rounded mt-3 px-2 hover:bg-blue-500  hover:text-white"
			>
				submit support ticket
			</button>
		</div>
	);
}
