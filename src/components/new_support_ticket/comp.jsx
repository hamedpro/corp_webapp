import { useContext, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper } from "../../common.js";
import { AppContext } from "../../AppContext";
export default function NewSupportTicket() {
	var ml = new multi_lang_helper(useContext(AppContext));
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
					alert(ml.render({ en: "done", fa: "" }));
				} else {
					alert(ml.render({ en: "result field was not true", fa: "" }));
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
			<h1 className="text-lg mb-2">{ml.render({ en: "new support ticket", fa: "" })}</h1>
			<hr />

			<p className="mt-2 inline-block">{ml.render({ en: "username :", fa: "" })}</p>
			<input
				className="border border-green-600 inline-block"
				placeholder={window.localStorage.getItem("username")}
				disabled
			/>

			<p className="mt-2">{ml.render({ en: "title:", fa: "" })}</p>
			<textarea id="title_input" className="border border-green-600"></textarea>

			<p className="mt-2">{ml.render({ en: "enter support ticket text :", fa: "" })}</p>
			<textarea id="support_ticket_text_input" className="border border-green-600"></textarea>

			<p className="mt-2">{ml.render({ en: "select support ticket type:", fa: "" })}</p>
			<select id="type-select-id" className="border border-green-500 p-1">
				<option value="bug">{ml.render({ en: "bug", fa: "" })}</option>
				<option value="suggestion">{ml.render({ en: "suggestion", fa: "" })}</option>
				<option value="other">{ml.render({ en: "other", fa: "" })}</option>
			</select>

			<button
				onClick={new_supprot_ticket}
				className="block border border-green-400 rounded mt-3 px-2 hover:bg-blue-500  hover:text-white"
			>
				{ml.render({ en: "submit support ticket", fa: "" })}
			</button>
		</div>
	);
}
