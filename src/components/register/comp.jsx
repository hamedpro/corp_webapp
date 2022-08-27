import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { customAjax } from "../../../src/custom_ajax.js";
import { AppContext } from "../../AppContext.js";
import { multi_lang_helper as ml } from "../../common.js";
import Section from "../section/comp";
export default function Register() {
	var navigator = useNavigate();
	function register() {
		var entered_username = document.getElementById("username_input").value;
		var entered_password = document.getElementById("password_input").value;
		customAjax({
			params: {
				task_name: "new_user",
				username: entered_username,
				password: entered_password,
			},
		}).then(
			(data) => {
				if (data.result) {
					alert(ml({ en: "done", fa: "انجام شد" }));
				}
			},
			(error) => {
				alert(ml({ en: "something went wrong", fa: "مشکلی رخ داد" }));
				console.log(error);
			}
		);
	}
	return (
		<Section title="register">
			<div className="px-2">
				<p>username:</p>
				<input id="username_input" className="border border-blue-400 rounded px-1" />
				<p>password:</p>
				<input
					id="password_input"
					className="border border-blue-400 rounded px-1"
					type="password"
				/>
				<button
					className="border border-blue-400 rounded block mt-2 px-2 py-1 hover:text-white hover:bg-blue-600 duration-300"
					onClick={register}
				>
					register new user
				</button>
			</div>
		</Section>
	);
}
