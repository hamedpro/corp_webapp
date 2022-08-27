import { useContext, useEffect } from "react";
import { customAjax } from "../../../src/custom_ajax.js";
import { multi_lang_helper as ml } from "../../common.js";
import { AppContext } from "../../AppContext";
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
				alert(ml({ en: "done", fa: "انجام شد" }));
			},
			(error) => {
				console.log(error);
			}
		);
	}
	// id username title type text is_proceed proceeded_by
	return (
		<div className="mx-auto rounded mt-2 p-2 w-full border border-blue-400">
			<h1 className="text-lg mb-2">
				{ml({ en: "new support ticket", fa: "تیکت پشتیبانی جدید" })}
			</h1>
			<hr />

			<p className="mt-2 inline-block">{ml({ en: "username :", fa: "نام کاربری:" })}</p>
			<input
				className="border border-green-600 inline-block"
				placeholder={window.localStorage.getItem("username")}
				disabled
			/>

			<p className="mt-2">{ml({ en: "title:", fa: "موضوع:" })}</p>
			<textarea id="title_input" className="border border-green-600"></textarea>

			<p className="mt-2">
				{ml({ en: "enter support ticket text :", fa: "متن تیکت پشتیبانی: " })}
			</p>
			<textarea id="support_ticket_text_input" className="border border-green-600"></textarea>

			<p className="mt-2">
				{ml({ en: "select support ticket type:", fa: "نوع تیکت پشتیبانی را انتخاب کنید:" })}
			</p>
			<select id="type-select-id" className="border border-green-500 p-1">
				<option value="bug">{ml({ en: "bug", fa: "اشکال نرم افزاری" })}</option>
				<option value="suggestion">{ml({ en: "suggestion", fa: "پیشنهاد" })}</option>
				<option value="other">{ml({ en: "other", fa: "غیره" })}</option>
			</select>

			<button
				onClick={new_supprot_ticket}
				className="block border border-green-400 rounded mt-3 px-2 hover:bg-blue-500  hover:text-white"
			>
				{ml({ en: "submit support ticket", fa: "ثبت تیکت پشتیبانی" })}
			</button>
		</div>
	);
}
